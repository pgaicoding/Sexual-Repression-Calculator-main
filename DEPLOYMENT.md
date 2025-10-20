# 宝塔面板部署指南

本文档详细介绍如何在宝塔面板环境下部署性压抑计算器项目到生产环境。

## 项目信息

- **项目名称**: 性压抑指数计算器
- **部署路径**: `www.chinadeeplearning.com/sri/`
- **技术栈**: React + TypeScript (纯前端静态项目)
- **访问地址**: https://www.chinadeeplearning.com/sri/

## 部署架构

```
用户访问: https://www.chinadeeplearning.com/sri/
    ↓
Cloudflare Tunnel
    ↓
Nginx 静态文件服务
    ↓
静态文件目录 (/www/wwwroot/www.chinadeeplearning.com/sri/dist/web/)
```

## 完整部署步骤

### 第一步：宝塔面板创建站点

1. **登录宝塔面板**: `bt.chinadeeplearning.com`

2. **创建网站**:
   - 网站 → 添加站点
   - 域名: `www.chinadeeplearning.com`
   - 根目录: `/www/wwwroot/www.chinadeeplearning.com` (默认)
   - PHP版本: 纯静态

3. **配置SSL证书**:
   - 设置 → SSL → Let's Encrypt → 申请

### 第二步：安装运行环境

1. **安装Node.js版本管理器**:
   - 软件商店 → 搜索 "Node.js版本管理器" → 安装

2. **安装Node.js 18+**:
   - Node.js管理器 → 设置 → 安装 Node.js 18.x

3. **验证Node.js安装**:
   ```bash
   node --version  # 应该显示 v18.x.x 或更高
   npm --version   # 应该显示 npm 版本
   ```

### 第三步：部署项目代码

1. **进入站点目录**:
   ```bash
   cd /www/wwwroot/www.chinadeeplearning.com
   ```

2. **清理默认文件**:
   ```bash
   rm -f index.html
   ```

3. **克隆项目**:
   ```bash
   git clone https://github.com/pgaicoding/Sexual-Repression-Calculator-main.git sri
   cd sri
   ```

### 第四步：构建项目

```bash
# 安装依赖
npm install

# 构建前端静态文件
npm run build:client

# 验证构建结果
ls -la dist/web/
```

**预期结果**:
- `dist/web/index.html` - 主页面文件
- `dist/web/static/` - 静态资源目录

### 第五步：配置Nginx

在宝塔面板中编辑网站配置，确保包含以下配置：

```nginx
server {
    listen 80;
    listen 443 ssl;
    http2 on;
    server_name www.chinadeeplearning.com chinadeeplearning.com;
    root /www/wwwroot/www.chinadeeplearning.com;
    index index.html index.htm;

    # SSL配置
    ssl_certificate /www/server/panel/vhost/cert/www.chinadeeplearning.com/fullchain.pem;
    ssl_certificate_key /www/server/panel/vhost/cert/www.chinadeeplearning.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # 性压抑计算器静态文件
    location /sri/ {
        alias /www/wwwroot/www.chinadeeplearning.com/sri/dist/web/;
        try_files $uri $uri/ /sri/index.html;
        index index.html;
    }

    # 主站点
    location / {
        try_files $uri $uri/ /index.html;
    }

    access_log /www/wwwlogs/chinadeeplearning.com.log;
    error_log /www/wwwlogs/chinadeeplearning.com.error.log;
}
```

### 第六步：配置Cloudflare Tunnel

编辑 `/etc/cloudflared/config.yml`：

```yaml
tunnel: bt-tunnel
credentials-file: /home/pengge/.cloudflared/af8df9d1-a880-4038-8942-44488293de60.json

ingress:
  - hostname: bt.chinadeeplearning.com
    service: https://192.168.1.168:8848
    originRequest:
      noTLSVerify: true
  - hostname: www.chinadeeplearning.com
    service: http://localhost:80
  - hostname: chinadeeplearning.com
    service: http://localhost:80
  - service: http_status:404
```

重启Cloudflare Tunnel：
```bash
sudo systemctl restart cloudflared
```

### 第七步：重载Nginx配置

```bash
sudo nginx -s reload
```

或在宝塔面板中：软件商店 → Nginx → 设置 → 重载配置

### 第八步：验证部署

**测试URL**:
- 主应用: `https://www.chinadeeplearning.com/sri/`
- 评估页面: `https://www.chinadeeplearning.com/sri/assessment`

**检查命令**:
```bash
# 验证静态文件存在
ls -la /www/wwwroot/www.chinadeeplearning.com/sri/dist/web/

# 检查Nginx配置
sudo nginx -t

# 查看Cloudflare Tunnel状态
sudo systemctl status cloudflared
```

## 日常维护

### 更新代码

```bash
cd /www/wwwroot/www.chinadeeplearning.com/sri

# 拉取最新代码
git pull origin main

# 重新构建前端
npm run build:client

# 验证文件更新
ls -la dist/web/
```

**注意事项**:
- 这是纯静态项目，不需要重启任何服务
- 更新后立即生效

### 查看日志

```bash
# Nginx访问日志
tail -f /www/wwwlogs/chinadeeplearning.com.log

# Nginx错误日志
tail -f /www/wwwlogs/chinadeeplearning.com.error.log

# Cloudflare Tunnel日志
sudo journalctl -u cloudflared -f
```

## 故障排除

### 1. 静态文件404

**检查项**:
- 静态文件路径: `/www/wwwroot/www.chinadeeplearning.com/sri/dist/web/`
- Nginx配置中的 `alias` 路径
- 文件权限: `chown -R www:www /www/wwwroot/www.chinadeeplearning.com/sri`

### 2. Cloudflare Tunnel错误

**解决方案**:
```bash
# 重启tunnel服务
sudo systemctl restart cloudflared

# 查看服务状态
sudo systemctl status cloudflared

# 查看详细日志
sudo journalctl -u cloudflared -f --lines=20
```

### 3. 构建失败

**解决方案**:
```bash
# 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 重新构建
npm run build:client

# 检查Node.js版本
node --version  # 需要18+
```

### 4. SSL证书问题

**解决方案**:
- 重新申请Let's Encrypt证书
- 检查域名DNS解析
- 确保80端口可访问

## 配置文件说明

### 关键构建脚本
- `npm run build:client` - 前端静态文件构建
- `npm run type-check` - TypeScript类型检查
- `npm run lint` - 代码规范检查

## 安全建议

1. **定期更新**:
   - 定期更新Node.js版本
   - 定期更新npm依赖包
   - 定期更新系统安全补丁

2. **监控**:
   - 定期检查访问日志
   - 监控网站可用性
   - 设置日志轮转避免磁盘空间问题

3. **备份策略**:
   - 定期备份代码和配置
   - 测试恢复流程
   - 监控磁盘空间使用

---

**文档维护**: 如有部署过程中遇到问题或配置变更，请及时更新此文档。

**最后更新**: 2024年10月20日