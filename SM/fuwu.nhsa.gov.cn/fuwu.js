
var crypto = require('crypto-js')

var timestamp;
function get_headers() {
    function i() {
            var e, t, n, i = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", r = "0123456789";
            return e = o(6, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),
            t = o(1, i),
            n = o(1, r),
            t + n + e;
            function o(e, t) {
                e = e || 32;
                for (var n = "", i = 0; i < e; i++)
                    n += t.charAt(Math.ceil(1e3 * Math.random()) % t.length);
                return n
            }
        }

    var s = Math.ceil((new Date).getTime() / 1e3);
    timestamp = s
    var h = i();
    var f = s + h + s;
    var headers = {}
    headers["x-tif-paasid"] = "undefined"
    headers["x-tif-signature"] = crypto.SHA256(f).toString()
    headers["x-tif-timestamp"] = s
    headers["x-tif-nonce"] = h
    return headers
}

data = {
    "addr": "",
    "regnCode": "310000",
    "medinsName": "",
    "medinsLvCode": "",
    "medinsTypeCode": "",
    "outMedOpenFlag": "",
    "pageNum": 2,
    "pageSize": 10,
    "queryDataSource": "es"
}


function v(e) {
                var t = [];
                for (var n in e)
                    if (e.hasOwnProperty(n) && (e[n] || "".concat(e[n])))
                        if ("data" === n) {
                            var i = Object.assign({}, e[n]);
                            for (var r in i) {
                                if ("number" != typeof i[r] && "boolean" != typeof i[r] || (i[r] = "" + i[r]),
                                Array.isArray(i[r]) && !i[r].length && delete i[r],
                                Array.isArray(i[r]) && i[r].length > 0)
                                    for (var o = 0; o < i[r].length; o++)
                                        i[r][o] = p(i[r][o]);
                                null != i[r] && i[r] || delete i[r]
                            }
                            var a = p(i);
                            t.push("".concat(n, "=").concat(JSON.stringify(a)))
                        } else
                            t.push("".concat(n, "=").concat(e[n]));
                return t.push("key=".concat("NMVFVILMKT13GEMD3BKPKCTBOQBPZR2P")),
                t.join("&")
            };

function m(e) {
                var t = {}
                  , n = ["signData", "encData", "extra"];
                for (var i in e)
                    e.hasOwnProperty(i) && !n.includes(i) && null != e[i] && (t[i] = e[i]);
                return t
            };

function p(e) {
            var t = new Array
              , n = 0;
            for (var i in e)
                t[n] = i,
                n++;
            var r = [].concat(t).sort()
              , o = {};
            for (var a in r)
                o[r[a]] = e[r[a]];
            return o
        };


function b(e, t) {
            var n = new s
              , i = (new s).getZ(h, t.substr(2, 128))
              , r = u.hexToArray(u.arrayToHex(i).toString())
              , o = e
              , a = u.hexToArray(o)
              , l = new Array(n.getDigestSize());
            return n.blockUpdate(r, 0, r.length),
            n.blockUpdate(a, 0, a.length),
            n.doFinal(l, 0),
            u.arrayToHex(l).toString()
        };


function get_data() {

    r = n("68b2")
    o = r.sm2
    data = {
                    data: data || {}
                }
    data.appCode = "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ";
    data.version = "1.0.0";
    data.encType = "SM4";
    data.signType = "SM2";
    // data.timestamp = timestamp;
    data.timestamp = 1728412816

    d = "009c4a35d9aca4c68f1a3fa89c93684347205a4d84dc260558a049869709ac0b42"
    data.signData = function(data) {
            var n = m(data)
              , i = p(n);
            i.data = p(i.data);
            var r = v(i)
              , a = o.doSignature(r, d, {
                hash: !0
            });
            console.log(r)
            return e.from(a, "hex").toString("base64")
    }(data);

    data.data = {
        encData: function(e, t) {
            switch (e.toUpperCase()) {
            case "SM2":
                return function(e) {
                    try {
                        var t = o.generateKeyPairHex()
                          , n = t.publicKey
                          , i = e;
                        g(i, n, 1)
                    } catch (e) {}
                }(t);
            case "SM3":
                return function(e) {
                    try {
                        var t = a(e);
                        return t
                    } catch (e) {}
                }(t);
            case "SM4":
                return function(e) {
                    try {
                        for (var t = e.data.data && JSON.stringify(e.data.data), n = "", i = 0; i < t.length; i++) {
                            var r = t.charAt(i)
                              , o = t.charCodeAt(i);
                            n += o > 127 ? "\\u" + o.toString(16).padStart(4, "0") : r
                        }
                        var a = A(n);
                        e.data.appCode && e.data.appCode !== u && (u = e.data.appCode);
                        var s = y(u, c)
                          , l = b(s, a);
                        return l.toUpperCase()
                    } catch (e) {}
                }(t)
            }
        }("SM4", t)
    };
    data = JSON.stringify({
        data: t.data
    })
}
get_data()
kdjkjf

// console.log(get_headers()["x-tif-signature"])


