import { useState, useRef } from "react";
import { Play, Code2, RotateCcw, Upload } from "lucide-react";

export default function CodeEditor() {
  const [code, setCode] = useState(`# 在这里编写 Python 代码
# 示例：计算列表的平均值

numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
count = len(numbers)
average = total / count

print(f"总和: {total}")
print(f"数量: {count}")
print(f"平均值: {average}")
`);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
        setOutput("");
      };
      reader.readAsText(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const convertPythonToJS = (pythonCode: string): string => {
    let jsCode = pythonCode
      .replace(/print\s*\(\s*f(["'])(.*?)\1\s*\)/g, (_, quote, content) => {
        const converted = content.replace(/\{([^}]+)\}/g, '${$1}');
        return `console.log(\`${converted}\`)`;
      })
      .replace(/print\s*\(\s*["']([^"]*)["']\s*\)/g, 'console.log("$1")')
      .replace(/print\s*\(\s*([^)]+)\s*\)/g, 'console.log($1)')
      .replace(/(\w+)\s*=\s*\[([^\]]+)\]/g, 'const $1 = [$2]')
      .replace(/(\w+)\s*=\s*(?!const|let|var)([^[\n;]+)/g, 'const $1 = $2')
      .replace(/def\s+(\w+)\s*\(([^)]*)\)\s*:/g, 'function $1($2) {')
      .replace(/return\s+(.+?)(?=\n|$)/g, 'return $1;')
      .replace(/if\s+(.+?)\s*:/g, 'if ($1) {')
      .replace(/elif\s+(.+?)\s*:/g, '} else if ($1) {')
      .replace(/else\s*:/g, '} else {')
      .replace(/for\s+(\w+)\s+in\s+range\(([^)]+)\)\s*:/g, 'for (let $1 = 0; $1 < $2; $1++) {')
      .replace(/for\s+(\w+)\s+in\s+([^:]+?)\s*:/g, 'for (const $1 of $2) {')
      .replace(/while\s+(.+?)\s*:/g, 'while ($1) {')
      .replace(/\.append\(([^)]+)\)/g, '.push($1)')
      .replace(/\.extend\(([^)]+)\)/g, '.push(...$1)')
      .replace(/\.keys\(\)/g, '.keys()')
      .replace(/\.values\(\)/g, '.values()')
      .replace(/\.items\(\)/g, '.entries()')
      .replace(/len\(([^)]+)\)/g, '$1.length')
      .replace(/sum\(([^)]+)\)/g, '$1.reduce((a, b) => a + b, 0)')
      .replace(/range\(([^)]+)\)/g, 'Array.from({length: $1}, (_, i) => i)')
      .replace(/int\(([^)]+)\)/g, 'parseInt($1)')
      .replace(/float\(([^)]+)\)/g, 'parseFloat($1)')
      .replace(/str\(([^)]+)\)/g, 'String($1)')
      .replace(/list\(([^)]+)\)/g, 'Array.from($1)')
      .replace(/\.split\(([^)]*)\)/g, '.split($1)')
      .replace(/\.strip\(\)/g, '.trim()')
      .replace(/\.upper\(\)/g, '.toUpperCase()')
      .replace(/\.lower\(\)/g, '.toLowerCase()')
      .replace(/\.title\(\)/g, '.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")')
      .replace(/\.replace\(([^,]+),\s*([^)]+)\)/g, '.replace($1, $2)')
      .replace(/#(.*?)$/gm, '// $1')
      .replace(/"""([\s\S]*?)"""/g, '`$1`')
      .replace(/'''([\s\S]*?)'''/g, '`$1`')
      .replace(/""([^"]*)""/g, '"$1"')
      .replace(/and/g, '&&')
      .replace(/or/g, '||')
      .replace(/not /g, '!')
      .replace(/True/g, 'true')
      .replace(/False/g, 'false')
      .replace(/None/g, 'null');
    
    jsCode = jsCode.replace(/\n{3,}/g, '\n\n');
    
    return jsCode;
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput("");

    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args: unknown[]) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };

    try {
      const jsCode = convertPythonToJS(code);
      const func = new Function(jsCode);
      func();
      setOutput(logs.join('\n') || '代码执行完成，无输出');
    } catch (error) {
      setOutput(`错误: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(`# 在这里编写 Python 代码
# 示例：计算列表的平均值

numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
count = len(numbers)
average = total / count

print(f"总和: {total}")
print(f"数量: {count}")
print(f"平均值: {average}")
`);
    setOutput("");
  };

  return (
    <div className="bg-white rounded-4xl shadow-sm border border-cream-200 overflow-hidden">
      <div className="bg-gradient-to-r from-softcyan-50 to-cream-50 px-6 py-4 border-b border-cream-200">
        <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-softcyan-600" />
          Python 代码编辑器
        </h3>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-stone-500">Python 代码</span>
            <div className="flex gap-2">
              <button
                onClick={triggerFileUpload}
                className="flex items-center gap-1 px-3 py-1.5 bg-softcyan-100 hover:bg-softcyan-200 text-softcyan-700 rounded-xl text-sm font-medium transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                打开文件
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".py,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={resetCode}
                className="flex items-center gap-1 px-3 py-1.5 bg-cream-100 hover:bg-cream-200 text-stone-600 rounded-xl text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                重置
              </button>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-1 px-4 py-1.5 bg-softpink-100 hover:bg-softpink-200 text-softpink-700 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                {isRunning ? '运行中...' : '运行'}
              </button>
            </div>
          </div>
          <div className="border border-cream-200 rounded-2xl overflow-hidden">
            <div className="bg-stone-800 px-4 py-2 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-2 text-xs text-stone-400">Python</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-48 bg-stone-900 text-green-400 font-mono text-sm p-4 focus:outline-none resize-none"
              placeholder="在此输入 Python 代码..."
            />
          </div>
        </div>

        <div>
          <span className="text-sm text-stone-500 mb-2 block">输出结果</span>
          <div className="bg-stone-100 rounded-2xl p-4 min-h-[80px]">
            <pre className="text-stone-700 font-mono text-sm whitespace-pre-wrap">
              {output || '点击"运行"按钮执行代码...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
