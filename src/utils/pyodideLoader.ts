// 全局Pyodide单例管理器 - 网站启动时预加载，所有页面共享使用

let pyodideInstance: any = null;
let initPromise: Promise<any> | null = null;
let initStatus: 'idle' | 'loading' | 'ready' | 'error' = 'idle';
let initErrorMessage: string = '';

// 回调监听列表，用于通知多个编辑器组件
const listeners: Set<(status: 'idle' | 'loading' | 'ready' | 'error', message: string) => void> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => {
    listener(initStatus, initStatus === 'error' ? initErrorMessage : '');
  });
}

export function getPyodideStatus(): 'idle' | 'loading' | 'ready' | 'error' {
  return initStatus;
}

export function getPyodideInstance(): any {
  return pyodideInstance;
}

export function subscribeToPyodideStatus(
  listener: (status: 'idle' | 'loading' | 'ready' | 'error', message: string) => void
): () => void {
  listeners.add(listener);
  // 立即调用一次，通知当前状态
  listener(initStatus, initStatus === 'error' ? initErrorMessage : '');
  return () => {
    listeners.delete(listener);
  };
}

export function preloadPyodide(): Promise<any> {
  // 如果已经就绪，直接返回
  if (pyodideInstance) {
    return Promise.resolve(pyodideInstance);
  }

  // 如果正在初始化，返回同一个Promise
  if (initPromise) {
    return initPromise;
  }

  initStatus = 'loading';
  notifyListeners();

  initPromise = (async () => {
    try {
      // 预连接CDN
      const preconn1 = document.createElement('link');
      preconn1.rel = 'preconnect';
      preconn1.href = 'https://cdn.jsdelivr.net';
      document.head.appendChild(preconn1);

      const preconn2 = document.createElement('link');
      preconn2.rel = 'preconnect';
      preconn2.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconn2);

      // 加载Pyodide脚本
      if (!window.loadPyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        document.head.appendChild(script);

        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Python环境加载失败'));
          const timeoutId = setTimeout(() => reject(new Error('加载超时，请检查网络')), 15000);
          script.onload = () => {
            clearTimeout(timeoutId);
            resolve();
          };
        });
      }

      // 初始化Pyodide
      const pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });

      // 批量加载数据分析包
      await pyodide.loadPackage(['pandas', 'numpy', 'matplotlib']);

      // 配置matplotlib
      await pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('AGG')
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
plt.rcParams['axes.unicode_minus'] = False
      `);

      pyodideInstance = pyodide;
      initStatus = 'ready';
      notifyListeners();
      return pyodide;
    } catch (error) {
      initStatus = 'error';
      initErrorMessage = error instanceof Error ? error.message : String(error);
      notifyListeners();
      throw error;
    }
  })();

  return initPromise;
}
