## JavaScrapt混淆技术

### ob混淆

[ob工具](https://obfuscator.io/)

#### 特点

- 一般由一个大数组或含有大数组的函数、一个自执行函数、解密函数和加密后的函数四部分
- 函数名和变量名通常以_0x或_0x开头，后接1-6位数字或字母组合
- 自执行函数进行移位操作，有明显的push、shift关键字

#### 实现ob混淆

```cmd
npm install javascript-obfuscator -a
```

#### postMessage方法

> Window.postMessage是用于子不同的的窗口、iframe或者标签也之间安全地传递消息的API，它可以跨域传递数据。

```cmd
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

- otherWindow：要发送消息的的目标窗口对象，可以是window,iframe.contentWindow等
- message：发送的消息内容。可以是字符串、对象或其他可以序列化的对象
- targetOrigin：目标窗口的源（协议+域名+端口号），用于控制消息发送的安全性。
- [transafe]：可选的Transferable对象数组

#### addEventListener

> 接受消息的窗口，通过监听message事件来获取的消息

```js
window.addEventListener('message', function(event){
  // 安全检查：确保消息来源是预期的
  if (event.origin !== 'https://xxxx.com'){
    return;
  }
  // 处理消息
  console.log('Received message:', event.data)
})
```

##### 测试

```js
window.postMessage('1234', 'https://www.baidu.com')
window.addEventListener('message', function(event){
  console.log(event)
})
```



#### [中国招标投标公共服务平台](https://ctbpsp.com/#/)





