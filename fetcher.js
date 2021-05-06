const request = require("request");
const fs = require("fs");
const args = process.argv.slice(2);
const website = args[0];
const fileLocation = args[1];
let fileStats = {};
let data;

request(website, (error, response, body) => {
  data = body;
  if (!error) {
    fs.writeFile(fileLocation, data, (err) => {
      if (err) {
        console.log(err);
      } else {
        fs.stat(fileLocation, (err, stats) => {
          if (err) {
            console.log(`File doesn't exist.`);
          } else {
            console.log(
              `File of '${stats.size}' Bytes written to ${fileLocation}`
            );
          }
        });
      }
    });
  } else {
    console.log(error);
    return
  }
});
