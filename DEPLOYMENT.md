# 部署指南 - Python数据分析学习网站

本文档说明如何将网站部署到 GitHub 和 Cloudflare Pages，实现代码提交后自动发布。

---

## 目录

1. [项目结构](#项目结构)
2. [首次部署步骤](#首次部署步骤)
3. [后续更新网站](#后续更新网站)
4. [本地开发](#本地开发)
5. [故障排查](#故障排查)

---

## 项目结构

```
course-site/
├── src/                    # React 源代码
│   ├── components/         # UI 组件（导航栏、代码编辑器等）
│   ├── pages/              # 页面组件（首页、课程、项目、题库等）
│   ├── data/               # 数据文件（课程内容、题库等）
│   └── utils/              # 工具函数（Pyodide加载器）
├── public/                 # 静态资源
├── dist/                   # 构建产物（自动生成，不提交）
├── .github/
│   └── workflows/
│       └── deploy.yml      # 自动部署配置
├── package.json            # 项目依赖
├── vite.config.ts          # Vite 构建配置
└── tailwind.config.js      # Tailwind CSS 配置
```

---

## 首次部署步骤

### 第一步：获取 Cloudflare 凭据

1. **登录 Cloudflare**
   - 访问 https://dash.cloudflare.com/
   - 登录你的账户

2. **获取 Account ID**
   - 在 Cloudflare 仪表盘首页右侧，找到「账户 ID」
   - 复制并保存备用

3. **创建 API Token**
   - 访问 https://dash.cloudflare.com/profile/api-tokens
   - 点击「创建令牌」
   - 选择「使用模板创建令牌」→「编辑 Cloudflare Workers」
   - 或者手动配置权限：
     - `Account Settings`: `Edit`
     - `Cloudflare Pages`: `Edit`
   - 点击「创建」并复制生成的 Token

### 第二步：在 GitHub 仓库添加 Secrets

1. **打开仓库设置**
   - 访问 https://github.com/WUYan720/course-site/settings/secrets/actions
   - 点击「New repository secret」

2. **添加两个 Secrets**

   | Secret 名称 | 值 |
   |-------------|-----|
   | `CLOUDFLARE_API_TOKEN` | 刚才创建的 API Token |
   | `CLOUDFLARE_ACCOUNT_ID` | 刚才获取的 Account ID |

### 第三步：创建 Cloudflare Pages 项目

1. **访问 Cloudflare Pages**
   - 打开 https://dash.cloudflare.com/?to=/:account/pages
   - 点击「创建项目」

2. **连接 Git 仓库**
   - 选择「连接到 Git 提供商」
   - 授权 GitHub（如果尚未授权）
   - 选择 `WUYan720/course-site` 仓库

3. **配置构建设置**

   | 设置项 | 值 |
   |--------|-----|
   | 项目名称 | `course-site` |
   | 生产分支 | `master` |
   | 构建命令 | `npm run build` |
   | 构建输出目录 | `dist` |

4. **环境变量（可选）**
   - 如果需要，添加 `NODE_VERSION`: `20`

5. **保存并部署**
   - 点击「保存并部署」
   - Cloudflare 会自动触发第一次构建

### 第四步：验证部署

1. **查看部署状态**
   - 打开 https://github.com/WUYan720/course-site/actions
   - 应该看到「Deploy to Cloudflare Pages」workflow 正在运行

2. **访问网站**
   - 构建完成后，Cloudflare 会提供一个 `.pages.dev` 域名
   - 或者绑定自定义域名

---

## 后续更新网站

### 更新代码 → 自动发布

1. **本地修改代码**
   ```bash
   cd course-site
   # 编辑文件...
   ```

2. **提交并推送**
   ```bash
   git add .
   git commit -m "描述你的修改"
   git push origin master
   ```

3. **等待自动部署**
   - GitHub Actions 会自动检测到新提交
   - 自动执行构建并部署到 Cloudflare Pages
   - 预计等待时间：1-3 分钟

4. **验证更新**
   - 访问你的 Cloudflare Pages 域名
   - 使用 Ctrl+Shift+R 强制刷新浏览器

### 查看部署历史

- **GitHub Actions**: https://github.com/WUYan720/course-site/actions
- **Cloudflare Pages**: https://dash.cloudflare.com/?to=/:account/pages

---

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物会输出到 `dist/` 目录。

---

## 故障排查

### 部署失败常见原因

| 问题 | 解决方案 |
|------|----------|
| `CLOUDFLARE_API_TOKEN` 无效 | 重新生成 Token，确保有 Pages 编辑权限 |
| `CLOUDFLARE_ACCOUNT_ID` 错误 | 检查 Cloudflare 仪表盘中的 Account ID |
| 构建超时 | Cloudflare Pages 构建超时限制约 20 分钟，确保构建能在时间内完成 |
| 页面白屏/资源 404 | 检查 `vite.config.ts` 中的 `base` 配置是否正确 |

### 手动重新部署

如果自动部署失败，可以：

1. 在 Cloudflare Pages 控制台点击「重新部署」
2. 或在 GitHub Actions 点击「Re-run all jobs」

### 禁用自动部署

如果想临时禁用自动部署，可以：

1. 修改 `.github/workflows/deploy.yml`，将 `on.push.branches` 改为只监听特定分支
2. 或在 GitHub Actions 设置中禁用 workflow

---

## 自定义域名（可选）

如果你有自定义域名，可以将其绑定到 Cloudflare Pages：

1. 在 Cloudflare Pages 项目设置中，点击「自定义域」
2. 输入你的域名
3. 按照指示添加 DNS 记录
4. 等待 SSL 证书自动配置

---

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router
- **Python 环境**: Pyodide (WebAssembly)
- **部署**: Cloudflare Pages + GitHub Actions

---

*最后更新: 2026-06-11*
