# vuejs-admin（基于eggjs、vuejs、mqtt开发的设备管理系统）

> * 用户模块（用户管理）
> * 设备模块（设备管理、设备实时监控、设备参数记录、设备类别管理、参数管理等）
> * 授权模块（引入OAuth2.0授权服务，方便将接口以OAuth提供第三方）
> * 消息模块（用户申请帮助消息、设备参数告警消息）

## 技术栈

关键字

> * 前端：vuejs、vue-router、vuex、axios、element-ui、iconfont、mqttjs
> * 后端：eggjs、mysql、OAuth2.0、restful、nginx、mqtt（负责前端所有消息推送&设备实时参数接收）

## 目前进展

已完成：

> * 用户登录、退出
> * 用户模块：用户列表（带分页）、新增、删除、编辑、头像上传等
> * 个人资料编辑设置
> * 设备模块：设备列表（带分页）、新增、删除、编辑等

TODO:

> 其余

## 构建

``` bash
# 安装依赖
npm install

# 测试运行
npm run dev

# 构建发布包
npm run build

# 构建并导出report
npm run build --report
```

## 效果图

用户登录：
![https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-login.png]

主页（登录后）：
![](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-main.png)

用户列表页：
![](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-users.png)

用户新增&编辑：
![](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-user-add.png)

设备列表：
![](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-devices.png)

设备新增&编辑：
![](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-device-edit.png)

设备类型：
![](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-devtypes.png)

