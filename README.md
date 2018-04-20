

# vuejs-admin（基于eggjs、vuejs、mqtt开发的设备管理系统）

服务端接口地址：https://github.com/caiya/vuejs-admin-server

> * 用户模块（用户管理）
> * 设备模块（设备管理、设备实时监控、设备参数记录、设备类别管理、参数管理等）
> * 授权模块（引入OAuth2.0授权服务，方便将接口以OAuth提供第三方）
> * 消息模块（用户申请帮助消息、设备参数告警消息）

## 技术栈

关键字

> * 前端：vuejs、vue-router、vuex、axios、element-ui、iconfont、mqttjs
> * 后端：eggjs、mysql、OAuth2.0、restful、nginx、mqtt、jwt（负责前端所有消息推送&设备实时参数接收）

## 目前进展

已完成

> * 用户登录、退出
> * 用户模块：用户列表（带分页）、新增、删除、编辑、头像上传等
> * 个人资料编辑设置
> * 设备模块：设备列表（带分页）、新增、删除、编辑等
> * 设备实时参数图表展现

TODO

> * 设备参数告警、参数管理等
> * OAuth2授权管理模块
> * 消息管理模块

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

## 测试账号

caiya928@aliyun.com/admin

ps: 大家别乱搞啊，要不服务就关停了

## 效果图

![登录](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-login.png)

![主页（登录后）](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-main.png)

![用户列表页](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-users.png)

![用户新增&编辑](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-user-add.png)

![设备列表](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-devices.png)

![设备新增&编辑](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-device-edit.png)

![设备类型](https://raw.githubusercontent.com/caiya/imgs/2a33e9a186536903ac75bcae5cffb9274876462f/dev-devtypes.png)

![设备监控](https://raw.githubusercontent.com/caiya/imgs/41f4765c49f7f1f93fed35b3a2099c8e16f1ba93/s-11.png)

![实时展现](https://raw.githubusercontent.com/caiya/imgs/41f4765c49f7f1f93fed35b3a2099c8e16f1ba93/s-22.png)

