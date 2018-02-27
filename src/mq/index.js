import mqtt from "mqtt"
import Vue from "vue"
import store from '../store'

import { Notification } from 'element-ui'

let client = null

// 开启订阅（登录成功后调用）
export const startSub = () => {
  client = mqtt.connect("ws://mq.tongxinmao.com:18832/web")
  client.on("connect", () => {
    client.subscribe("msgNotice")   // 订阅消息类通知主题
    client.subscribe("/devices/#")    // 订阅所有设备相关主题
    console.log("链接mqtt成功，并已订阅相关主题")
  }).on('error', err => {
    console.log("链接mqtt报错", err)
    client.end()
    client.reconnect()  
  }).on("message", (topic, message) => {
    console.log('topic', topic);
    // message is Buffer
    if (topic + '' === 'msgNotice') {   // 消息类通知主题
      Notification({
        title: '通知',
        type: "success",
        message: JSON.parse(message.toString()).msg
      })
    } else {    // 设备相关主题，这里将各个模块消息写入各个模块的vuex state中，然后各个模块再getter取值
      const devId = topic.substring(9);
      const arg = {
        devId,
        msg: message.toString()
      }
      console.log('收到设备上传消息：', arg);
      store.commit('setDevArgsMsg', arg);
    }
  })

  Vue.prototype.$mqtt = client    // 方便在vue组件中可以直接使用this.$mqtt -> client
}

// 关闭订阅（退出登录时调用）
export const closeSub = () => {
  client && client.end()
}
