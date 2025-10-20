# 宝塔面板部署指南

本文档详细介绍如何在宝塔面板环境下部署性压抑计算器项目到生产环境。

## 项目信息

- **项目名称**: 性压抑指数计算器
- **部署路径**: `www.chinadeeplearning.com/sri/`
- **技术栈**: React + TypeScript + Hono.js + Node.js
- **运行端口**: 3001

## 部署架构

```
用户访问: https://www.chinadeeplearning.com/sri/
    ↓
Nginx 反向代理 (宝塔)
    ↓
Node.js 应用 (端口 3001)
    ↓
静态文件服务 (/www/wwwroot/www.chinadeeplearning.com/sri/dist/web/)
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

4. **如果npm命令未找到，手动安装Node.js**:
   ```bash
   # 更新软件包列表
   sudo apt update

   # 安装Node.js 18.x
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # 验证安装
   node --version
   npm --version
   ```

5. **安装PM2管理器**:
   - 软件商店 → 搜索 "PM2管理器" → 安装

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

# 构建生产版本
npm run build:prod

# 创建日志目录
mkdir -p logs

# 验证构建结果
ls -la dist/
```

**预期结果**:
- `dist/server.cjs` - Node.js服务器文件
- `dist/web/` - 前端构建文件
- `ecosystem.config.json` - PM2配置文件

### 第五步：启动应用服务

```bash
# 使用PM2启动应用
pm2 start ecosystem.config.json

# 查看应用状态
pm2 status

# 查看日志 (确保启动成功)
pm2 logs sri-calculator

# 设置开机自启
pm2 save
pm2 startup
```

### 第六步：配置Nginx反向代理

在宝塔面板中编辑 `www.chinadeeplearning.com` 站点配置文件，添加以下配置到 `server` 块内:

```nginx
# 性压抑计算器 - 反向代理配置
location /sri/ {
    # 移除 /sri 前缀，转发到后端
    rewrite ^/sri/(.*) /$1 break;

    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Port $server_port;

    # WebSocket 支持
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_cache_bypass $http_upgrade;
}

# 静态资源直接服务 - 性能优化
location /sri/static/ {
    alias /www/wwwroot/www.chinadeeplearning.com/sri/dist/web/static/;
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}
```

### 第七步：配置防火墙

在宝塔面板安全设置中添加端口规则:
- 端口: `3001`
- 类型: `TCP`
- 策略: `放行`
- 备注: `性压抑计算器Node.js应用`

### 第八步：验证部署

**测试URL**:
- 主页: `https://www.chinadeeplearning.com/sri/`
- 评估页面: `https://www.chinadeeplearning.com/sri/assessment`
- 静态资源: `https://www.chinadeeplearning.com/sri/static/css/index.*.css`

**检查命令**:
```bash
# PM2状态
pm2 status

# 应用日志
pm2 logs sri-calculator

# 端口监听
netstat -tlnp | grep 3001

# Nginx状态
systemctl status nginx
```

## 日常维护

### 更新代码

```bash
cd /www/wwwroot/www.chinadeeplearning.com/sri

# 拉取最新代码
git pull

# 重新构建
npm run build:prod

# 重启应用
pm2 reload sri-calculator

# 查看状态
pm2 status
```

### 查看日志

```bash
# 实时日志
pm2 logs sri-calculator

# 查看最近100行日志
pm2 logs sri-calculator --lines 100

# 清空日志
pm2 flush sri-calculator
```

### 重启/停止应用

```bash
# 重启应用
pm2 restart sri-calculator

# 停止应用
pm2 stop sri-calculator

# 删除应用进程
pm2 delete sri-calculator
```

## 故障排除

### 1. npm命令未找到

**错误信息**: `npm command not found, but can be installed with: apt install npm`

**解决方案**:
```bash
# 方法1: 安装官方推荐版本 (推荐)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 方法2: 使用系统包管理器 (版本可能较老)
sudo apt update
sudo apt install nodejs npm

# 验证安装
node --version  # 需要 >= v18.0.0
npm --version

# 如果版本太低，使用方法1重新安装
```

### 2. 应用无法启动

**检查项**:
- Node.js版本是否为18+: `node --version`
- 依赖是否安装完整: `npm install`
- 构建是否成功: `ls -la dist/`
- PM2配置路径是否正确

**解决方案**:
```bash
# 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 重新构建
npm run build:prod

# 手动启动测试
cd dist && node server.cjs
```

### 2. 端口冲突

**检查端口占用**:
```bash
netstat -tlnp | grep 3001
```

**解决方案**:
- 修改 `ecosystem.config.json` 中的端口
- 同时更新Nginx配置中的 `proxy_pass` 端口

### 3. 静态资源404

**检查项**:
- 静态文件路径: `/www/wwwroot/www.chinadeeplearning.com/sri/dist/web/static/`
- Nginx配置中的 `alias` 路径
- 文件权限: `chown -R www:www /www/wwwroot/www.chinadeeplearning.com/sri`

### 4. SSL证书问题

**解决方案**:
- 重新申请Let's Encrypt证书
- 检查域名DNS解析
- 确保80端口可访问

### 5. 内存不足

**监控命令**:
```bash
# 查看内存使用
free -h

# 查看PM2进程内存使用
pm2 monit
```

**解决方案**:
- 重启PM2进程: `pm2 restart sri-calculator`
- 增加服务器内存
- 优化应用代码

## 配置文件说明

### ecosystem.config.json
```json
{
  "apps": [{
    "name": "sri-calculator",
    "script": "./dist/server.cjs",
    "cwd": "/www/wwwroot/www.chinadeeplearning.com/sri",
    "instances": 1,
    "exec_mode": "cluster",
    "env": {
      "NODE_ENV": "production",
      "PORT": "3001"
    }
  }]
}
```

### 关键构建脚本
- `npm run build:prod` - 生产环境构建
- `npm run type-check` - TypeScript类型检查
- `npm run lint` - 代码规范检查

## 安全建议

1. **定期更新**:
   - 定期更新Node.js版本
   - 定期更新npm依赖包
   - 定期更新系统安全补丁

2. **监控日志**:
   - 定期检查应用日志
   - 监控错误率和性能指标
   - 设置日志轮转避免磁盘空间问题

3. **备份策略**:
   - 定期备份代码和配置
   - 测试恢复流程
   - 监控磁盘空间使用

---

**文档维护**: 如有部署过程中遇到问题或配置变更，请及时更新此文档。

**最后更新**: 2024年10月20日