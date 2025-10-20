# China Deep Learning - AI工具集 & 性压抑指数计算器

🧠 **基于深度学习和科学研究的专业AI工具平台 - MVP版本**

## 🎯 项目概述

China Deep Learning 是一个基于AI技术的专业工具平台，目前已成功上线**性压抑指数计算器**作为首个核心工具。该平台采用现代化架构，支持多工具扩展，为个人成长、学术研究和专业应用提供科学可靠的解决方案。

### 🚀 MVP版本里程碑 (v1.0.0)

**✅ 已完成核心功能:**
- ✅ 性压抑指数计算器完整功能
- ✅ 主站点首页 (www.chinadeeplearning.com)
- ✅ 统一设计风格和用户体验
- ✅ 生产环境部署和优化
- ✅ Cloudflare Tunnel配置
- ✅ 静态文件服务架构
- ✅ 完整的部署文档

**🎯 访问地址:**
- **主站**: https://www.chinadeeplearning.com/
- **性压抑计算器**: https://www.chinadeeplearning.com/sri/

## 🏗️ 平台架构

### 技术栈
- **前端**: React 19 + TypeScript + Tailwind CSS
- **构建**: Rsbuild + npm
- **部署**: Nginx静态文件服务 + Cloudflare Tunnel
- **服务器**: Ubuntu 24.04 + 宝塔面板管理

### 部署架构
```
用户访问 → Cloudflare CDN → Cloudflare Tunnel → Nginx → 静态文件
```

## 🔧 当前工具集

### 1. 性压抑指数计算器 (SRI Calculator) ✅ 已上线

基于国际认可心理测量学量表的专业性心理健康评估工具。

**核心特性:**
- 🔬 **科学可靠**: 基于SIS/SES、Mosher性内疚、KISS-9、SOS等量表
- ⚡ **双版本支持**: 快测版(8-15分钟) + 完整版(25-40分钟)
- 📊 **专业分析**: 四维度分析 + SRI指数(0-100) + 个性化建议
- 🔒 **隐私保护**: 100%本地数据处理，无服务器传输
- 📱 **响应式设计**: 支持所有设备访问

**技术实现:**
- 纯前端React应用
- 本地localStorage数据存储
- 科学的心理测量算法
- 完整的用户体验流程

### 2. AI数据分析平台 🚧 即将推出
基于深度学习的数据分析平台，提供自动化数据处理、模式识别和预测分析功能。

### 3. 智能学习助手 🚧 开发中
AI驱动的个性化学习平台，根据学习者特点提供定制化学习路径和内容推荐。

## 🚀 快速开始

### 开发环境要求
- Node.js >= 18.0.0
- 现代浏览器支持

### 本地开发
```bash
# 克隆项目
git clone https://github.com/pgaicoding/Sexual-Repression-Calculator-main.git
cd Sexual-Repression-Calculator-main

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建前端静态文件
npm run build:client
```

### 生产部署

详细部署指南请参考: [DEPLOYMENT.md](DEPLOYMENT.md)

**部署方式**: 静态文件服务 (推荐)
```bash
# 构建前端静态文件
npm run build:client

# 部署到Nginx静态目录
cp -r dist/web/* /www/wwwroot/www.chinadeeplearning.com/sri/
```

## 📁 项目结构

```
├── src/                          # 源代码
│   ├── components/               # React组件
│   │   ├── assessment/           # 评估相关组件
│   │   ├── common/              # 通用组件
│   │   └── ui/                  # shadcn/ui组件
│   ├── pages/                   # 页面组件
│   ├── lib/                     # 工具库
│   │   ├── scales/              # 量表定义
│   │   ├── calculator/          # 计算引擎
│   │   └── storage/             # 存储管理
│   └── types/                   # TypeScript类型
├── homepage/                    # 主站点首页
│   └── index.html              # 主站点HTML文件
├── DEPLOYMENT.md               # 完整部署文档
├── package.json                # 项目配置
└── README.md                   # 项目说明
```

## 🔒 隐私保护

### 数据安全承诺

- ✅ **本地处理**: 所有数据在客户端处理，不上传服务器
- ✅ **匿名化**: 导出数据完全匿名化处理
- ✅ **用户控制**: 用户拥有完全的数据控制权
- ✅ **安全清理**: 提供安全的数据删除功能
- ✅ **透明度**: 开源代码，完全透明

### 数据存储

- **位置**: 浏览器 localStorage
- **内容**: 评估回答、结果分析、人口学信息
- **加密**: 客户端存储，无需加密传输
- **清理**: 用户可随时完全删除

## 📊 科学依据

### 量表来源

1. **SIS/SES**: Janssen等人的双控制模型量表
2. **Mosher性内疚**: 经典性内疚测量工具
3. **KISS-9**: Kyle等人的性羞耻量表
4. **SOS**: Fisher等人的性观感调查
5. **BSAS**: Hendrick等人的性态度量表

### 信效度

- 所有量表均经过严格的心理测量学验证
- 具有良好的内部一致性和重测信度
- 在多个文化背景下得到验证

## 🛠️ 开发指南

### 代码风格

- TypeScript严格模式
- ESLint + Prettier格式化
- 组件化设计原则
- 函数式编程优先

### 贡献指南

1. Fork项目
2. 创建特性分支
3. 提交更改
4. 发起Pull Request

### 测试

```
# 类型检查
npm run type-check

# 代码检查
npm run lint

# 构建测试
npm run build
```

## 📖 使用指南

### 开始评估

1. 访问主页选择评估版本
2. 仔细阅读知情同意书
3. 填写基本人口学信息
4. 按照指引完成问卷
5. 查看详细结果分析

### 结果解读

- **SRI指数**: 综合性压抑程度(0-100)
- **四维度分析**: 具体问题领域识别
- **个性化建议**: 基于结果的改善建议
- **非诊断性**: 仅供自我了解，不替代专业诊断

## ⚠️ 重要声明

- 本工具仅供教育和自我了解使用
- 不能替代专业心理健康服务
- 如有严重心理健康问题，请寻求专业帮助
- 评估结果不构成医学诊断

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 支持

如果您觉得这个项目有帮助，请给我们一个 ⭐️

---

**性压抑指数计算器** - 让科学研究服务于个人成长和性健康发展
