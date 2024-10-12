const fs = require('fs')
const wasmCode = fs.readFileSync('wasm.wasm')

function get_sign(page) {
    WebAssembly.instantiate(wasmCode, {
        "env": {},
        "wasi_snapshot_preview1": {}
    }).then(result => {
        const instance = result.instance;
        const exportedFunc = instance.exports;
        // console.log(exportedFunc)
        asm = exportedFunc
        var e = asm.encrypt(page, parseInt(Math.round((new Date).getTime() / 1e3).toString()))
        console.log(e)
    })
}

get_sign(process.argv[2])


