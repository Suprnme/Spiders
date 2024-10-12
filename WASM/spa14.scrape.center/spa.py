import requests
import subprocess

sign = subprocess.run(['node', 'spa.js', '10'], capture_output=True, text=True)


# print(sign.stdout)

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Referer": "https://spa14.scrape.center/page/2",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\""
}
url = "https://spa14.scrape.center/api/movie/"
params = {
    "limit": "10",
    "offset": "10",
    "sign": sign.stdout
}
response = requests.get(url, headers=headers, params=params)

print(response.text)
print(response)