# SRI项目邀请码集成计划

## 📋 项目概述

**当前状态**: SRI计算器v1.0.0 - 已完成MVP，运行正常
**下一阶段**: 集成邀请码验证系统，实现商业化付费访问

## 🎯 集成目标

- **商业模式**: 小红书0.99元付费 → 自动发邀请码 → 用户专属访问
- **技术目标**: 无缝集成邀请码验证，不影响现有功能
- **用户体验**: 付费用户正常使用，未付费用户引导购买

## 🔗 技术集成要点

### 1. 路由改造
```typescript
// 当前路由结构 (App.tsx:31-40)
<Route path="/" element={<Index />} />                    // 当前首页
<Route path="/assessment" element={<Assessment />} />     // 当前评估页

// 改造后路由结构
<Route path="/" element={<PurchaseGuide />} />             // 新：购买引导页
<Route path="/:inviteCode" element={<InviteCodeGate />} /> // 新：邀请码验证
<Route path="/:inviteCode/assessment" element={<Assessment />} />
<Route path="/:inviteCode/results" element={<Results />} />
// ... 其他现有页面都需要邀请码前缀
```

### 2. 邀请码验证组件设计
```typescript
// 新增组件：InviteCodeGate.tsx
// 功能：
// - 验证邀请码有效性
// - 设备指纹绑定检查
// - 失败时显示购买页面
// - 成功时渲染原有内容
```

### 3. 环境变量配置
```env
# 需要在 .env 中新增
REACT_APP_INVITE_API_URL=https://api.chinadeeplearning.com
REACT_APP_INVITE_API_KEY=sri_calculator_api_key
REACT_APP_INVITE_APP_ID=sri-calculator
```

## 📂 需要修改的文件清单

### 核心修改文件 (必须改)
- [ ] `src/App.tsx` - 路由结构调整
- [ ] `src/main.tsx` - 可能需要调整basename
- [ ] `package.json` - 添加邀请码SDK依赖

### 新增文件 (需要创建)
- [ ] `src/components/InviteCodeGate.tsx` - 邀请码验证门禁
- [ ] `src/components/PurchaseGuide.tsx` - 购买引导页面
- [ ] `src/hooks/useInviteValidation.ts` - 邀请码验证Hook
- [ ] `src/utils/invite-config.ts` - 邀请码相关配置

### 可能修改文件 (根据需要)
- [ ] `src/components/common/` - 可能需要传递邀请码参数
- [ ] `src/lib/storage/` - 可能需要存储邀请码状态
- [ ] `rsbuild.config.ts` - 可能需要调整构建配置

## 🔧 集成步骤规划

### Phase 1: 准备工作 (1天)
1. 安装邀请码SDK：`npm install @china-deep-learning/invite-sdk`
2. 配置环境变量
3. 创建基础的邀请码验证组件

### Phase 2: 路由改造 (2天)
1. 修改App.tsx路由结构
2. 创建InviteCodeGate组件
3. 测试路由跳转逻辑

### Phase 3: 功能集成 (2天)
1. 集成设备指纹验证
2. 添加购买引导页面
3. 处理各种边界情况

### Phase 4: 测试验证 (1天)
1. 本地测试完整流程
2. 模拟各种错误场景
3. 性能和用户体验优化

## 📱 用户访问流程设计

### 当前流程
```
用户访问 → https://www.chinadeeplearning.com/sri/ → 直接进入首页
```

### 改造后流程
```
情况1 (无邀请码):
用户访问 → https://www.chinadeeplearning.com/sri/ → 购买引导页

情况2 (有邀请码):
用户访问 → https://www.chinadeeplearning.com/sri/SRI-ABC123DEF456
         → 验证邀请码 → 成功 → 进入正常测试流程
                    → 失败 → 显示错误 + 购买引导

情况3 (已验证用户):
用户访问 → 检查本地缓存 → 直接进入 (缓存5分钟)
```

## 🛡️ 数据保护策略

### 现有数据兼容性
- ✅ **评估数据**: 现有localStorage数据完全保留
- ✅ **用户进度**: 不影响已开始的测试流程
- ✅ **历史记录**: 现有功能正常工作

### 新增数据存储
```typescript
// localStorage新增字段
interface InviteCodeState {
  inviteCode: string;           // 当前邀请码
  validatedAt: number;          // 验证时间戳
  expiresAt: number;           // 过期时间
  deviceFingerprint: string;   // 设备指纹
  permissions: string[];       // 权限列表
}
```

## 🚨 风险评估和预案

### 技术风险
| 风险 | 概率 | 影响 | 预案 |
|------|------|------|------|
| 邀请码API不可用 | 中 | 高 | 降级为免费模式 + 提示 |
| 设备指纹冲突 | 低 | 中 | 人工客服处理流程 |
| 路由改造影响SEO | 中 | 低 | 保留原路由重定向 |

### 业务风险
| 风险 | 概率 | 影响 | 预案 |
|------|------|------|------|
| 用户接受度低 | 中 | 高 | A/B测试，调整定价 |
| 小红书政策变化 | 高 | 中 | 多平台布局 |
| 技术门槛影响转化 | 低 | 中 | 优化用户引导 |

## 📞 关键联系信息

### 邀请码系统项目
- **项目位置**: `D:\ClaudeCode\China-Deep-Learning-Invite-System\`
- **API文档**: `docs/API_REFERENCE.md`
- **集成示例**: `examples/react-example/README.md`

### SRI项目集成负责人
- **当前SRI项目**: `D:\ClaudeCode\Sexual-Repression-Calculator-main\`
- **主要文件**: `src/App.tsx` (路由配置)
- **构建配置**: `rsbuild.config.ts`

## 📅 时间计划

### 邀请码系统开发 (2-3周)
- Week 1: 后端API开发
- Week 2: 前端SDK开发
- Week 3: 测试和部署

### SRI集成开发 (1周)
- Day 1-2: 准备工作和路由改造
- Day 3-4: 功能集成和测试
- Day 5: 部署和验证

### 联调测试 (3天)
- Day 1: 本地联调
- Day 2: 测试环境验证
- Day 3: 生产环境上线

## ✅ 验收标准

### 功能验收
- [ ] 无邀请码访问显示购买页面
- [ ] 有效邀请码正常进入测试
- [ ] 无效/过期邀请码显示错误提示
- [ ] 设备数量限制正确执行
- [ ] 现有测试功能完全正常

### 性能验收
- [ ] 邀请码验证响应时间 < 2秒
- [ ] 页面加载时间无明显增加
- [ ] 设备指纹生成 < 1秒
- [ ] 缓存机制正常工作

### 用户体验验收
- [ ] 错误提示友好清晰
- [ ] 购买流程引导明确
- [ ] 加载状态提示到位
- [ ] 移动端适配完美

---

**重要提醒**: 这个文档要保留在SRI项目中，作为后续集成的指导手册！🎯