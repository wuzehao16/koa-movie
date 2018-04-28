// https://user.qzone.qq.com/550237170/334
// switcher_plogin
// 下一步 c_tx
//  mode_post时间
// floor
// q_namecard
const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://user.qzone.qq.com/550237170/334/');
  // Scrape
  await page.waitForNavigation();
  await page.waitFor(2000)
  await page.click('#switcher_plogin')
  await page.type('#u','279920030@qq.com', {delay: 20})
  await page.type('#p','123', {delay: 20})
  await page.click('#login_button')
  // await page.click('div.image_container');
  const result = await page.evaluate(() => {
      let data = []; // 初始化空数组来存储数据
      let elements = document.querySelectorAll('li.bor3'); // 获取名字
      for (var element of elements){ // 循环
          let name = element.querySelector('.q_namecard').innerText; // 获取昵称
          let content = element.querySelector('td').innerText; // 获取内容
          let time = element.querySelector('.mode_post').innerText; // 获取时间
          let floor = element.querySelector('.floor').innerText; // 获取时间

          data.push({name, content, time, floor}); // 存入数组
      }
      return data; // 返回数据
  });
  // await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
  // await page.waitFor(1000);
  // const result = await page.evaluate(() => {
  //   let title = document.querySelector('h1').innerText;
  //   let price = document.querySelector('.price_color').innerText;
  //   let imgUrl = document.querySelector('.carousel-inner img').src;
  // return {
  //   title,
  //   price,
  //   imgUrl
  // }
  // });
  browser.close();
  return result;
};
scrape().then((value) => {
    console.log(value); // 成功！
});
