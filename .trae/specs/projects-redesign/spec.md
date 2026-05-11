# 项目内容更新 - 项目概述版本

## Why
用户需要将项目内容从"配套练习手册"版本更新为"项目概述"版本，展示每个项目的概述和核心知识点拆解，而非课堂例题和练习题。

## What Changes
- 更新 `projects.ts` 数据文件，使用《AI时代Python商务数据分析10大实战项目项目概述.md》的内容
- 项目列表页卡片布局调整：顶部显示项目概述，下方显示项目标题
- 项目详情页布局调整：顶部显示项目概述，然后是项目标题，最后是核心知识点拆解

## Impact
- Affected code: 
  - `/workspace/src/data/projects.ts` - 更新项目数据内容
  - `/workspace/src/pages/Projects.tsx` - 调整卡片布局
  - `/workspace/src/pages/ProjectDetail.tsx` - 调整详情页布局

## ADDED Requirements

### Requirement: 项目概述展示
系统应在项目卡片和详情页顶部展示项目概述内容。

#### Scenario: 项目列表页卡片展示
- **WHEN** 用户访问项目列表页
- **THEN** 每个项目卡片顶部显示项目概述，下方显示项目标题

#### Scenario: 项目详情页展示
- **WHEN** 用户访问项目详情页
- **THEN** 页面顶部显示项目概述，然后是项目标题，最后是核心知识点拆解（技术知识点、商务分析知识点、AI融合知识点）

## MODIFIED Requirements

### Requirement: 项目数据结构
项目数据应包含：
- id: 项目编号
- name: 项目名称
- summary: 项目简介
- overview: 项目概述
- dataFile: 配套数据文件名
- content: 核心知识点拆解内容（技术知识点、商务分析知识点、AI融合知识点）
