// https://user.qzone.qq.com/550237170/334
// switcher_plogin
// 下一步 c_tx
//  mode_post时间
// floor
// q_namecard
//https://xui.ptlogin2.qq.com/cgi-bin/xlogin?proxy_url=https%3A//qzs.qq.com/qzone/v6/portal/proxy.html&daid=5&&hide_title_bar=1&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=549000912&style=22&target=self&s_url=https%3A%2F%2Fqzs.qzone.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone%26specifyurl%3Dhttp%253A%252F%252Fuser.qzone.qq.com%252F550237170%252F334%252F&pt_qr_app=手机QQ空间&pt_qr_link=http%3A//z.qzone.com/download.html&self_regurl=https%3A//qzs.qq.com/qzone/v6/reg/index.html&pt_qr_help_link=http%3A//z.qzone.com/download.html&pt_no_auth=0
const puppeteer = require('puppeteer');

function waitForFrame(page) {
  let fulfill;
  const promise = new Promise(x => fulfill = x);
  checkFrame();
  return promise;

  function checkFrame() {
    const frame = page.frames().find(f => f.name() === 'app_canvas_frame');
    if (frame)
      fulfill(frame);
    else
      page.once('frameattached', checkFrame);
  }
}

let scrape = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://xui.ptlogin2.qq.com/cgi-bin/xlogin?proxy_url=https%3A//qzs.qq.com/qzone/v6/portal/proxy.html&daid=5&&hide_title_bar=1&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=549000912&style=22&target=self&s_url=https%3A%2F%2Fqzs.qzone.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone%26specifyurl%3Dhttp%253A%252F%252Fuser.qzone.qq.com%252F550237170%252F334%252F&pt_qr_app=手机QQ空间&pt_qr_link=http%3A//z.qzone.com/download.html&self_regurl=https%3A//qzs.qq.com/qzone/v6/reg/index.html&pt_qr_help_link=http%3A//z.qzone.com/download.html&pt_no_auth=0');
  // Scrape
  // await page.waitForNavigation();
  await page.waitFor(4000)
  await page.click('#switcher_plogin')
  await page.type('[name=u]','279920030@qq.com', {delay: 20})
  await page.type('[name=p]','123456', {delay: 20})
  await page.click('#login_button')
  await page.waitFor(3000)
  const frame = await waitForFrame(page);
  const button = await frame.$("a[onClick='QZBlog.Util.PageIndexManager.goPage(1);return false;']");
  button.click();
  await page.waitFor(1000)
  var result = []
  // while (result.length <100) {
    result = await page.evaluate(() => {
         let data = []; // 初始化空数组来存储数据
         var obj = document.getElementById('tgb');
         let elements = obj.contentDocument.querySelectorAll('div.wrap'); // 获取名字
         for (var element of elements){ // 循环
             let name = element.querySelector('.username .q_namecard').innerText; // 获取昵称
             let content = element.querySelector('td').innerText; // 获取内容
             let time = element.querySelector('.reply_wrap .mode_post').innerText; // 获取时间
             let floor = element.querySelector('.floor').innerText; // 获取时间
             let avator = element.querySelector('.avatar img').src;
             data.push({name, content, time, floor, avator}); // 存入数组
         }
         return data; // 返回数据
     });

  browser.close();
  return result;
};
scrape().then((value) => {
    console.log(value); // 成功！
});
