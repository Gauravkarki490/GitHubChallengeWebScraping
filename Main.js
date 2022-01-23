const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const Page = require("./Page");
const url = "https://github.com/topics";

request(url, cb);

function cb(err, response, html) {
  if (err) {
    console.log(err);
  } else {
    // console.log(html);
    extractLink(html);
  }
}

function extractLink(html) {
  const $ = cheerio.load(html);
  const link = $(".no-underline.d-flex.flex-column.flex-justify-center");

  for (let i = 0; i < link.length; i++) {
    let fullPath = "https://github.com" + $(link[i]).attr("href");
    // console.log(fullPath);
    //TODO create folder
    let name = fullPath.split("/");
    let folderName = name[name.length - 1];
    // console.log(folderName);
    console.log(folderName);

    Page.gAlink(fullPath, folderName);
  }
}
