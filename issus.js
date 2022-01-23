const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

// const url = "https://github.com/huginn/huginn/issues";

function extractAll(url, topic, repoName) {
  request(url, cb);
  function cb(err, response, html) {
    if (err) {
      console.log(err);
    } else {
      // console.log(html);
      extractIssuesLink(html);
    }
  }

  function extractIssuesLink(html) {
    const $ = cheerio.load(html);
    let issArr = $(
      ".d-block.d-md-none.position-absolute.top-0.bottom-0.left-0.right-0"
    );
    console.log(topic + "---->" + repoName);
    let arr = [];
    for (let i = 0; i < 8; i++) {
      let path = $(issArr[i]).attr("href");
      arr.push(path);
      // console.log(path);
    }
    // console.log(arr);
    let folderPath = path.join(__dirname, topic);
    dirCreator(folderPath);
    // let filePath = path.join(folderPath, repoName + ".json"); //* for json
    let filePath = path.join(folderPath, repoName + ".pdf");
    let text = JSON.stringify(arr);
    let pdfDoc = new pdfkit();
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(text);
    pdfDoc.end();
    // fs.writeFileSync(filePath, text);//* json
  }
}

function dirCreator(folderPath) {
  if (fs.existsSync(folderPath) == false) {
    fs.mkdirSync(folderPath);
  }
}
module.exports = {
  eAll: extractAll,
};
