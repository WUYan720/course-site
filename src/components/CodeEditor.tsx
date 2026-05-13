import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Code2 } from "lucide-react";

declare global {
  interface Window {
    loadPyodide: any;
  }
}

interface OutputItem {
  type: "text" | "image" | "error" | "html";
  content: string;
}

export default function CodeEditor() {
  const [code, setCode] = useState(`# 在这里编写 Python 代码
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 示例：创建DataFrame
df = pd.DataFrame({
    '产品': ['苹果', '香蕉', '橙子', '葡萄'],
    '销量': [120, 85, 200, 95],
    '单价': [5.5, 3.2, 4.8, 8.9]
})

print("=== 产品销售数据 ===")
print(df)

# 示例：绘制图表
plt.figure(figsize=(8, 5))
plt.bar(df['产品'], df['销量'], color=['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA'])
plt.title('产品销量对比', fontsize=14)
plt.xlabel('产品')
plt.ylabel('销量')
plt.tight_layout()
plt.show()

print("图表已生成!")
`);
  const [output, setOutput] = useState<OutputItem[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("正在初始化 Python 环境...");

  const pyodideRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const initPyodide = async () => {
      try {
        setLoadingText("加载 Pyodide...");
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
        document.head.appendChild(script);

        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Pyodide"));
        });

        setLoadingText("初始化 Python...");
        const pyodide = await window.loadPyodide();

        setLoadingText("加载 pandas...");
        await pyodide.loadPackage("pandas");

        setLoadingText("加载 numpy...");
        await pyodide.loadPackage("numpy");

        setLoadingText("加载 matplotlib...");
        await pyodide.loadPackage("matplotlib");

        setLoadingText("配置 matplotlib...");
        await pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('AGG')
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
plt.rcParams['axes.unicode_minus'] = False
        `);

        pyodideRef.current = pyodide;
        setPyodideReady(true);
        setIsLoading(false);
        setOutput([{ type: "text", content: "✅ Python 环境已就绪！支持 pandas, numpy, matplotlib" }]);
      } catch (error) {
        console.error("初始化失败:", error);
        setOutput([{ type: "error", content: "❌ Python 环境初始化失败，请刷新页面重试" }]);
        setIsLoading(false);
      }
    };

    initPyodide();
  }, []);

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newCode = code.substring(0, start) + "    " + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        }, 0);
      }
    }
  };

  const runCode = async () => {
    if (!pyodideReady || isRunning) return;

    setIsRunning(true);
    setOutput([{ type: "text", content: "🔄 正在执行代码..." }]);

    const results: OutputItem[] = [];

    try {
      const pyodide = pyodideRef.current;

      await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
      `);

      await pyodide.runPythonAsync(`
import matplotlib.pyplot as plt
import base64
from io import BytesIO

def show():
    buf = BytesIO()
    fig = plt.gcf()
    fig.savefig(buf, format='png', dpi=100, bbox_inches='tight', facecolor='white')
    buf.seek(0)
    img_data = base64.b64encode(buf.read()).decode('utf-8')
    print(f"__PLOT__:data:image/png;base64,{img_data}")
    plt.close(fig)

plt.show = show
      `);

      try {
        await pyodide.runPythonAsync(code);
      } catch (execError: any) {
        let msg = execError.message || String(execError);
        msg = msg.replace(/File "<exec>", /g, '');
        msg = msg.replace(/PythonError: /g, '');
        results.push({ type: "error", content: `❌ 错误: ${msg}` });
      }

      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      const stderr = pyodide.runPython("sys.stderr.getvalue()");

      const lines = stdout.split("\n");
      for (const line of lines) {
        if (line.startsWith("__PLOT__:")) {
          const imgSrc = line.substring(9);
          results.push({
            type: "html",
            content: imgSrc,
          });
        } else if (line.trim()) {
          results.push({ type: "text", content: line });
        }
      }

      if (stderr && stderr.trim()) {
        results.push({ type: "error", content: `⚠️ ${stderr.trim().substring(0, 200)}` });
      }

      if (results.length === 0 || (results.length === 1 && results[0].type === "text" && results[0].content === "🔄 正在执行代码...")) {
        results.push({ type: "text", content: "✅ 代码执行完成" });
      }

      results.unshift({ type: "text", content: "✅ 执行成功" });

    } catch (error: any) {
      console.error("执行失败:", error);
      results.push({ type: "error", content: `❌ 执行失败: ${(error.message || String(error)).substring(0, 200)}` });
    }

    setOutput(results);
    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(`# 在这里编写 Python 代码
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 示例：创建DataFrame
df = pd.DataFrame({
    '产品': ['苹果', '香蕉', '橙子', '葡萄'],
    '销量': [120, 85, 200, 95],
    '单价': [5.5, 3.2, 4.8, 8.9]
})

print("=== 产品销售数据 ===")
print(df)

# 示例：绘制图表
plt.figure(figsize=(8, 5))
plt.bar(df['产品'], df['销量'], color=['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA'])
plt.title('产品销量对比', fontsize=14)
plt.xlabel('产品')
plt.ylabel('销量')
plt.tight_layout()
plt.show()

print("图表已生成!")
`);
    setOutput([{ type: "text", content: "🔄 代码已重置" }]);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-4xl shadow-sm border border-cream-200 overflow-hidden flex flex-col h-full">
      <div className="bg-gradient-to-r from-softcyan-50 to-cream-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-cream-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-stone-800 flex items-center gap-2">
            <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-softcyan-600" />
            Python 代码编辑器
          </h3>
          <div className="flex items-center gap-2">
            {pyodideReady ? (
              <span className="text-xs sm:text-sm text-green-600 font-medium">✅ 就绪</span>
            ) : (
              <span className="text-xs sm:text-sm text-softpink-600 font-medium">
                {isLoading ? `⏳ ${loadingText}` : "❌ 加载失败"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-3 sm:p-6 min-h-0">
        <div className="flex-[2] flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm text-stone-500">Python 代码</span>
            <div className="flex gap-1.5 sm:gap-2">
              <button
                onClick={resetCode}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-cream-100 hover:bg-cream-200 text-stone-600 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">重置</span>
              </button>
              <button
                onClick={runCode}
                disabled={isRunning || !pyodideReady}
                className="flex items-center gap-1 px-3 sm:px-4 py-1 sm:py-1.5 bg-softpink-100 hover:bg-softpink-200 text-softpink-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-colors disabled:opacity-50"
              >
                {isRunning ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
                {isRunning ? "运行中" : "运行"}
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0 border border-cream-200 rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="bg-stone-800 px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full"></div>
              <span className="ml-1 sm:ml-2 text-xs text-stone-400">Python</span>
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleTabKey}
              className="flex-1 w-full bg-stone-900 text-green-400 font-mono text-sm p-3 sm:p-4 focus:outline-none resize-none min-h-0"
              placeholder="在此输入 Python 代码..."
              spellCheck={false}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col flex-1 min-h-0">
          <span className="text-xs sm:text-sm text-stone-500 mb-2 block">输出结果</span>
          <div className="bg-stone-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex-1 overflow-y-auto min-h-0">
            {output.length === 0 ? (
              <pre className="text-stone-500 font-mono text-xs sm:text-sm">
                点击"运行"按钮执行代码...
              </pre>
            ) : (
              output.map((item, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  {item.type === "text" && (
                    <pre className="text-stone-700 font-mono text-xs sm:text-sm whitespace-pre-wrap break-all">
                      {item.content}
                    </pre>
                  )}
                  {item.type === "error" && (
                    <pre className="text-red-600 font-mono text-xs sm:text-sm whitespace-pre-wrap break-all bg-red-50 p-2 rounded-lg">
                      {item.content}
                    </pre>
                  )}
                  {item.type === "html" && (
                    <img
                      src={item.content}
                      alt="图表"
                      style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "8px", background: "white" }}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}