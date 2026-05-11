# 首页改造 - 实现计划

## [ ] Task 1: 修改 Home.tsx，添加顶部大标题和副标题
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 修改现有首页代码
  - 添加顶部大标题区域："Python商务数据分析学习平台"
  - 添加副标题描述平台定位
  - 使用奶油风配色和大圆角风格
  - 响应式设计，适配电脑和手机
- **Acceptance Criteria Addressed**: AC-1, AC-6, AC-7
- **Test Requirements**:
  - `human-judgement` TR-1.1: 检查大标题和副标题是否清晰可见，风格是否与现有一致
  - `human-judgement` TR-1.2: 检查响应式是否正常
- **Notes**: 使用现有配色系统，不新增颜色

## [ ] Task 2: 添加平台简介模块
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 在标题下方添加平台简介模块
  - 使用卡片式布局，大圆角，柔和间距
  - 内容为平台介绍
- **Acceptance Criteria Addressed**: AC-2, AC-6, AC-7
- **Test Requirements**:
  - `human-judgement` TR-2.1: 检查平台简介模块是否正常显示，风格统一
- **Notes**: 保持与现有风格一致

## [ ] Task 3: 添加核心功能板块介绍
- **Priority**: P0
- **Depends On**: Task 2
- **Description**: 
  - 添加四个核心功能卡片
  - 功能分别为：AI陪练、在线代码编辑器、CSV数据分析练习、项目实战题库
  - 每个卡片配 Lucide 图标，卡片布局整齐
- **Acceptance Criteria Addressed**: AC-3, AC-6, AC-7
- **Test Requirements**:
  - `human-judgement` TR-3.1: 检查四个功能卡片是否正常显示
  - `human-judgement` TR-3.2: 检查卡片布局和图标是否正确
- **Notes**: 使用 Lucide 图标库中合适的图标

## [ ] Task 4: 添加适合学习人群模块
- **Priority**: P0
- **Depends On**: Task 3
- **Description**: 
  - 添加适合学习人群模块
  - 使用卡片式布局
  - 大圆角，柔和间距
- **Acceptance Criteria Addressed**: AC-4, AC-6, AC-7
- **Test Requirements**:
  - `human-judgement` TR-4.1: 检查适合学习人群模块是否正常显示
- **Notes**: 保持与现有风格一致

## [ ] Task 5: 添加平台优势模块
- **Priority**: P0
- **Depends On**: Task 4
- **Description**: 
  - 添加平台优势模块
  - 使用卡片式布局
  - 大圆角，柔和间距
- **Acceptance Criteria Addressed**: AC-5, AC-6, AC-7
- **Test Requirements**:
  - `human-judgement` TR-5.1: 检查平台优势模块是否正常显示
- **Notes**: 保持与现有风格一致

## [ ] Task 6: 整体美化和响应式优化
- **Priority**: P1
- **Depends On**: Task 5
- **Description**: 
  - 整体美化所有模块的间距、布局
  - 确保响应式在不同屏幕尺寸下完美适配
  - 内容饱满好看
- **Acceptance Criteria Addressed**: AC-6, AC-7
- **Test Requirements**:
  - `human-judgement` TR-6.1: 检查整体布局是否美观，内容是否饱满
  - `human-judgement` TR-6.2: 检查响应式是否在不同尺寸下完美适配

## [ ] Task 7: 验证其他页面没有改动
- **Priority**: P0
- **Depends On**: Task 6
- **Description**: 
  - 验证课程页面、项目页面、题库页面保持原样
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `human-judgement` TR-7.1: 检查其他三个页面是否没有改动
