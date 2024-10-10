import requests
import json

import execjs

with open("fuwu.js", 'r', encoding='utf-8') as f:
    js_code = f.read()

ctx = execjs.compile(js_code)

result = ctx.call('get_headers')

headers = {
    "Accept": "application/json",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://fuwu.nhsa.gov.cn",
    "Referer": "https://fuwu.nhsa.gov.cn/nationalHallSt/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "X-Tingyun": "c=B|4Nl_NnGbjwY;x=174f4e1387784107",
    "channel": "web",
    "contentType": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "x-tif-nonce": result["x-tif-nonce"],
    "x-tif-paasid": result["x-tif-paasid"] ,
    "x-tif-signature": result["x-tif-signature"],
    "x-tif-timestamp": str(result["x-tif-timestamp"])
}

cookies = {
    "https_waf_cookie": "6c12120d-31e7-45291a98df83e9cdad138193b5758f7f702d",
    "amap_local": "310000",
    "yb_header_active": "-1"
}
url = "https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital"
data = {
    "addr": "",
    "regnCode": "310000",
    "medinsName": "",
    "medinsLvCode": "",
    "medinsTypeCode": "",
    "outMedOpenFlag": "",
    "pageNum": 1,
    "pageSize": 10,
    "queryDataSource": "es"
}

data = ctx.call('get_data', data, result["x-tif-timestamp"])

print(data)

response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)