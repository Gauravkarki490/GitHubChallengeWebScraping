const request = require("request");
const cheerio = require("cheerio");
const { func } = require("assert-plus");

const Iss = require("./issus");
// let url = "https://github.com/topics/twitter";

function getAllLink(url, topic) {
  request(url, cb);
  function cb(err, response, html) {
    if (err) {
      console.log("example");
      console.log(err);
    } else {
      // console.log(html);
      extractLinkProject(html);
    }
  }
  function extractLinkProject(html) {
    const $ = cheerio.load(html);
    const projectLinks = $(
      ".f3.color-fg-muted.text-normal.lh-condensed .text-bold.wb-break-word"
    );
    console.log(topic);
    for (let i = 0; i < 8; i++) {
      let fullPath = "https://github.com" + $(projectLinks[i]).attr("href");
      let repoName = fullPath.split("/").pop();
      fullPath += "/issues";
      console.log(fullPath);
      Iss.eAll(fullPath, topic, repoName);
    }
    console.log("-------------------------------");
  }

  // function issuePage(path) {
  //   request(path, cb);
  //   function cb(err, response, html) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       // console.log(html);
  //       extractIssuesPage(html);
  //     }
  //   }
  // }
  // function extractIssuesPage(html) {
  //   const $ = cheerio.load(html);
  //   const iss = $("#issues-tab");
  //   let fullpath = "https://github.com" + $(iss).attr("href");
  //   // console.log(fullpath);
  //   Iss.eAll(fullpath);
  // }
}

module.exports = {
  gAlink: getAllLink,
};
// #issues-tab
