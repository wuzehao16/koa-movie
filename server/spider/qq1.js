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
    const frame = page.frames().find(f => f.name() === 'login_frame');
    if (frame)
      fulfill(frame);
    else
      page.once('frameattached', checkFrame);
  }
}

let scrape = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://user.qzone.qq.com/550237170/334');
  await page.waitFor(2000)
  // const frame = await page.frames().find(f => f.name() === 'login_frame');
  const frame = await waitForFrame(page);
  console.log(frame)
  // await frame.waitForSelector('#switcher_plogin');
  await frame.click('#switcher_plogin')

  // const button = await frame.$("a[onClick='QZBlog.Util.PageIndexManager.goPage(1);return false;']");

  await page.type('[name=u]','279920030@qq.com', {delay: 20})
  await page.type('[name=p]','test', {delay: 20})
  await page.click('#login_button')
  browser.close();
  return result;
};
scrape().then((value) => {
    console.log(value); // 成功！
});
