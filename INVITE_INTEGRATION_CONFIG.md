# 邀请码系统集成配置

## 🔗 关联项目信息
- **邀请码系统项目路径**: `D:\ClaudeCode\China-Deep-Learning-Invite-System\`
- **SRI项目当前版本**: v1.0.0 MVP
- **集成计划文档**: `INVITE_CODE_INTEGRATION_PLAN.md`

## 📋 集成清单

### 待安装依赖
```json
{
  "@china-deep-learning/invite-sdk": "^1.0.0"
}
```

### 待添加环境变量
```env
REACT_APP_INVITE_API_URL=https://api.chinadeeplearning.com
REACT_APP_INVITE_API_KEY=sri_calculator_api_key
REACT_APP_INVITE_APP_ID=sri-calculator
```

### 关键技术参数
- **应用ID**: `sri-calculator`
- **定价**: 0.99元
- **有效期**: 30天
- **设备限制**: 2台设备
- **API端点**: `/api/v1/invite/validate`

### URL结构变更
```
当前: https://www.chinadeeplearning.com/sri/
改为: https://www.chinadeeplearning.com/sri/{邀请码}/
```

## 🎯 集成完成标志
- [ ] 路由支持邀请码参数
- [ ] 设备指纹验证正常
- [ ] 购买引导页面完成
- [ ] 错误处理机制完善
- [ ] 现有功能无影响

---
**创建时间**: 2025-10-21
**状态**: 等待邀请码系统开发完成