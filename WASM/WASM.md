### WASM

<!--WebAssembly(简称Wasm）是一种现代的低级编程语言，开发者可以将C，C++等语言编写的代码编译成WebAssembly格式-->

**wasm语法：[wasm基本语法](https://www.zhihu.com/column/c_1603119162976595968)**





#### WASM调用方法

##### 1.创建Wasm模块

- 用C/C++、Rust等语言编写代码，并编译成Wasm文件。

##### 2.加载Wasm模块

- 使用JavaScript的**`fetch`** API获取Wasm文件，并用**`WebAssembly.instantiate`**或**`WebAssembly.instantiateStreaming`**进行加载。

##### 3.调用Wasm导出函数

- 通过实例化的Wasm模块，可以调用导出的函数并与JavaScript进行交互。





#### fetch模块

`fetch` 模块用于在浏览器中进行网络请求，主要作用是获取资源，如文本、JSON、图片或Wasm模块。它返回一个 `Promise`，方便处理异步操作。



```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


```



#### WebAssembly模块

`WebAssembly.instantiate` 是一个用于加载和实例化 WebAssembly 模块的函数。它可以接受一个字节数组（Wasm 二进制数据）和可选的导入对象。 

```js
WebAssembly.instantiate(bytes, importObject)
```

##### 1. `bytes` 和 `importObject`  

###### 1. `bytes`

- **类型**：`ArrayBuffer` 或 `TypedArray`，通常由 `fetch` 请求得到的二进制数据。
- **作用**：包含了编译好的 WebAssembly 模块的二进制表示。Wasm 模块必须先编译成这种格式，才能被实例化。

###### 2. `importObject`

- **类型**：对象，用于提供模块所需的外部依赖。
- **作用**：包含了 WabAssembly 模块需要调用的外部函数或全局变量。这个对象的结构通常与模块中定义的导入相对应。例如，如果模块需要一个外部函数，你需要在这个对象中定义它(类似于创建类的初始化参数)。

```js
const importObject = {
    env: {
        importedFunc: function() {
            console.log('Hello from JavaScript!');
        }
    }
};

// 假设 bytes 是从网络请求中获取的 ArrayBuffer
WebAssembly.instantiate(bytes, importObject)
    .then(results => {
        const instance = results.instance;
        instance.exports.yourFunction();
    });

```





##### 2. WebAssembly返回值

  `WebAssembly.instantiate` 的返回值是一个 `Promise`，该 `Promise` 解析为一个对象，包含以下属性： 

###### 1. `instance`

- **类型**：`WebAssembly.Instance` 对象。
- **作用**：表示实例化后的 WebAssembly 模块，包含模块的导出（即可以被调用的函数和变量）。

###### 2. `module`

- **类型**：`WebAssembly.Module` 对象。
- **作用**：表示编译后的 WebAssembly 模块，可以用于进一步的实例化。

```js
fetch('module.wasm')
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes))
    .then(results => {
        const instance = results.instance;
        console.log('Exports:', instance.exports); // 访问导出函数
    })
    .catch(err => {
        console.error('Error:', err);
    });

```





#### js调用

node有提供WebAssembly库可以直接使



```js
const fs = require('fs');
const wasmCode = fs.readFileSync('Wasm.wasm');
console.log(wasmCode)
WebAssembly.instantiate(wasmCode, {
    "env": {},
    "wasi_snapshot_preview1": {}
}).then(result => {
    const instance = result.instance;
    const exportedFunc = instance.exports
    console.log(exportedFunc); // 调用 wasm 模块中的函数
    console.log(exportedFunc.encrypt(50, 1727186733)); // 调用 wasm 模块中的函数
})


```



#### python调用

py需要使用pywasm库进行调用

```python
import pywasm
import time

t = int(time.time())
vm = pywasm.load("./Wasm.wasm", {
    "env": {},
    "wasi_snapshot_preview1": {}
})
print(vm)
sign = vm.exec("encrypt", [40, t])
print(sign)
```



