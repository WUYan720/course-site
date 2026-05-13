# 网站响应式布局重构 - 产品需求文档

## Overview
- **Summary**: 对现有Python商务数据分析学习平台进行响应式布局重构，实现电脑、平板、手机端完美适配
- **Purpose**: 修复当前布局错乱、元素错位、手机端排版拥挤等问题，提升多设备用户体验

## Goals
- 全站响应式自适应布局，完美适配电脑端、平板、手机端
- 保留网站原有所有功能、菜单、代码编辑器样式不变
- 修复布局错乱、元素错位、手机端排版拥挤问题
- 导航栏在手机端自动变成折叠汉堡菜单
- 页面宽度、边距、字体、按钮、代码编辑器容器全部自适应缩放

## Non-Goals
- 不改变原有配色方案
- 不新增功能模块
- 不修改代码运行逻辑
- 不改动后端逻辑

## Background & Context
- 技术栈：React 18 + TypeScript + Tailwind CSS + Vite
- 现有组件：Navbar、Home、Projects、ProjectDetail、Courses、Questions、CodeEditor、CsvUploader、AIChat
- 现有配色：cream-*, softpink-*, softcyan-*（温柔奶油清新风）
- 问题：固定宽度 `w-[1280px]` 导致手机端溢出，汉堡菜单缺失

## Functional Requirements

### FR-1: 响应式容器宽度
容器宽度随屏幕自适应：
- 电脑端 (≥1024px)：固定最大宽度 1280px
- 平板端 (768px-1023px)：90% 宽度
- 手机端 (<768px)：100% 宽度，减少边距

### FR-2: 导航栏响应式
- 电脑端：水平导航菜单
- 手机端：汉堡菜单 + 侧滑抽屉
- 汉堡菜单动画：平滑展开/收起

### FR-3: 首页响应式
- 核心功能网格：电脑4列 → 平板2列 → 手机1列
- 平台优势网格：电脑4列 → 平板2列 → 手机1列
- 标题和按钮自适应缩放

### FR-4: 项目列表响应式
- 电脑端：4列网格
- 平板端：2列网格
- 手机端：1列网格，卡片全宽

### FR-5: 项目详情响应式
- 左侧例题 + 右侧代码编辑器：电脑端左右并排 → 手机端上下堆叠
- 代码编辑器容器自适应宽度
- CSV上传区自适应
- AI聊天窗口自适应

### FR-6: 字体响应式
- 标题、按钮、文本在手机端适当缩小
- 保持可读性

### FR-7: 滚动条美化
- 保持现有的自定义滚动条样式
- 手机端隐藏滚动条（原生滚动）

## Technical Requirements

### TR-1: 使用标准媒体查询
```css
/* 断点定义 */
sm: 640px   /* 大手机 */
md: 768px   /* 平板 */
lg: 1024px  /* 小电脑 */
xl: 1280px  /* 大电脑 */
```

### TR-2: Tailwind 响应式类
- 使用 `sm:`, `md:`, `lg:`, `xl:` 前缀
- 保持代码简洁可维护

### TR-3: 汉堡菜单实现
- 使用 React state 控制菜单开关
- 使用 `framer-motion` 或纯 CSS 动画
- 点击外部关闭菜单

## Acceptance Criteria

### AC-1: 导航栏
- **Given**: 用户在手机端访问网站
- **When**: 点击汉堡菜单图标
- **Then**: 显示侧滑抽屉菜单，包含所有导航项
- **Verification**: `human-judgment`

### AC-2: 首页布局
- **Given**: 用户在手机端访问首页
- **When**: 页面加载完成
- **Then**: 功能卡片单列显示，标题文字适当缩小
- **Verification**: `human-judgment`

### AC-3: 项目列表
- **Given**: 用户在手机端访问项目列表
- **When**: 页面加载完成
- **Then**: 卡片单列显示，内容完整
- **Verification**: `human-judgment`

### AC-4: 项目详情
- **Given**: 用户在手机端访问项目详情
- **When**: 页面加载完成
- **Then**: 例题和代码编辑器上下堆叠，代码编辑器可横向滚动
- **Verification**: `human-judgment`

### AC-5: 代码编辑器
- **Given**: 用户在手机端使用代码编辑器
- **When**: 输入或运行代码
- **Then**: 功能正常，容器自适应
- **Verification**: `human-judgment`

### AC-6: 多设备测试
- **Given**: 用户使用不同设备访问
- **When**: 逐一测试电脑、平板、手机
- **Then**: 所有页面布局正常，无溢出，无错位
- **Verification**: `human-judgment`

## Modified Files
- `src/components/Navbar.tsx` - 添加汉堡菜单
- `src/pages/Home.tsx` - 响应式网格布局
- `src/pages/Projects.tsx` - 响应式卡片网格
- `src/pages/ProjectDetail.tsx` - 响应式并排布局
- `src/pages/Courses.tsx` - 响应式布局
- `src/pages/Questions.tsx` - 响应式布局
- `tailwind.config.js` - 添加响应式配置（如需要）
