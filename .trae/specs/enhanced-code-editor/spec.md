# Python数据分析代码编辑器增强 - 产品需求文档

## Overview
- **Summary**: 将现有Python代码编辑器升级为功能完整的数据分析在线工作环境，支持pandas、numpy、matplotlib等库的代码运行和图表渲染
- **Purpose**: 让用户能够在浏览器中完成完整的数据分析流程，包括数据读取、清洗、处理、可视化、建模

## Why
- 现有代码编辑器仅支持基础Python语法转换，无法满足数据分析场景需求
- 需要支持pandas DataFrame、matplotlib图表渲染等核心功能
- 用户需要一个完整的在线数据分析工作环境

## What Changes

### 核心功能增强
1. **Python沙箱执行引擎**
   - 使用Pyodide在浏览器中运行真实Python
   - 支持pandas、numpy、matplotlib、seaborn等数据分析库
   - 支持图表渲染输出

2. **文件上传与数据加载**
   - 支持CSV、Excel、JSON文件上传
   - 自动加载为pandas DataFrame
   - 文件内容预览

3. **代码编辑器增强**
   - 使用Monaco Editor实现专业代码编辑
   - 语法高亮、自动补全、代码折叠
   - 行号显示、代码缩进

4. **输出与可视化**
   - 支持matplotlib/seaborn图表渲染
   - 支持DataFrame表格预览
   - 清晰的错误信息和日志

5. **代码管理**
   - 清空、重置代码
   - 复制代码到剪贴板
   - 下载代码文件(.py)
   - 保存/加载代码（localStorage）

## Technical Requirements

### TR-1: Pyodide集成
```javascript
// 使用Pyodide WebAssembly运行Python
const pyodide = await loadPyodide();
await pyodide.loadPackage(['pandas', 'numpy', 'matplotlib', 'seaborn']);
```

### TR-2: Monaco Editor
- 使用Monaco Editor实现专业代码编辑体验
- Python语法高亮
- 自动补全

### TR-3: 文件处理
- 使用PapaParse处理CSV
- 使用SheetJS处理Excel
- 支持拖拽上传

### TR-4: 图表渲染
- Matplotlib生成base64图片
- 在HTML中渲染图表

## Modified Files
- `src/components/CodeEditor.tsx` - 完全重写为增强版编辑器

## Dependencies
- pyodide (通过CDN加载)
- @monaco-editor/react (代码编辑器)
- papaparse (CSV解析)
- xlsx (Excel解析)

## Acceptance Criteria

### AC-1: Python执行
- **Given**: 用户编写pandas代码
- **When**: 点击运行按钮
- **Then**: 代码正确执行，输出DataFrame结果或图表
- **Verification**: human-judgment

### AC-2: 文件上传
- **Given**: 用户上传CSV文件
- **When**: 文件上传完成
- **Then**: 自动创建DataFrame，可直接使用
- **Verification**: human-judgment

### AC-3: 图表渲染
- **Given**: 用户运行matplotlib代码
- **When**: 代码生成图表
- **Then**: 图表在输出区域正确显示
- **Verification**: human-judgment

### AC-4: 代码编辑
- **Given**: 用户编写代码
- **When**: 使用编辑功能
- **Then**: 语法高亮、自动补全正常工作
- **Verification**: human-judgment
