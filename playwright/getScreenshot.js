// const { firefox } = require("playwright");

// const getScreenshot = async (url) => {
//   const browser = await firefox.launch();
//   const context = await browser.newContext({
//     userAgent:
//       "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
//   });
//   const page = await context.newPage();
//   await page.goto(url, { waitUntil: "load" });
//   const buffer = await page.screenshot();
//   await browser.close();

//   return buffer.toString("base64");
// };

// module.exports = getScreenshot;
