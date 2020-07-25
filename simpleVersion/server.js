const fs = require("fs");
const http = require("http");
const { spawn, spawnSync } = require("child_process")
const PORT = 10000;
"use strict";

http.createServer((req, res) => {
  if (req.method == "GET") {
    if (!req.url.startsWith("/backEnd/streams")) {
      // if root url requested, send people to trumpet app page
      const filePath = (req.url == "/") ?
                       "frontEnd/trumpetApp.html" : req.url.slice(1);
      fs.readFile(filePath, (error, data) => {
        if (error) {
          res.writeHead(404, {"content-type": "text/plain"})
          res.write("Resource not found")
          res.end()
        } else {
          const extension = filePath.split(".")[1];
          switch (extension) {
            case "html":
              res.writeHead(200, {"Content-Type": "text/html"});
              break;
            case "js":
              res.writeHead(200, {"Content-Type": "application/javascript"});
              break;
            case "txt":
            default:
              res.writeHead(200, {"Content-Type": "text/plain"});
          }
          res.write(data);
          res.end();
        }
      });
    } else {
      // req.url starts with /backEnd/streams so we need to
      // serve up the relevant stream
      trackHash = req.url.slice("/backEnd/streams/".length);
      const trackPath = `backEnd/trackFiles/${trackHash}.json`;
      // we create a pipe whose name is randomised to receive output
      const pipeName = Math.floor(Math.random()*(2**44)).toString(16);
      const pipePath = `backEnd/pipes/${pipeName}`
      spawnSync("mkfifo", [pipePath]);

      fs.open(pipePath, "r", (err, fd) => {
        res.writeHead(200, {"Content-Type": "audio/wav"})
        fs.createReadStream(null, {fd}).pipe(res);
      });
      // start the backend wav-generating process, and set it's input
      // to trackPath and output to pipePath
      trumpet = spawn("python3", ["backEnd/trumpet.py", trackPath, pipePath]);
      trumpet.stderr.on('data', data => {
        console.error(`stderr: ${data}`);
      });

      // end the response and garbage collect resources
      // when the processing has been completed
      trumpet.stdout.on('data', chunk => {
        let data = chunk.toString();
        if (data == "All done\n") {
          res.end();
          spawnSync("rm", [pipePath]);
          spawnSync("rm", [trackPath]);
        }
      });
    }
  } else if (req.method == "POST") {
    file = req.url.slice(1);
    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        // file doesn't exist, so write it
        let data = ""
        req.on('data', chunk => {data = data.concat(chunk);});
        req.on('end', () => {
          fs.writeFile(file, data, (err) => {
            if (err) {
              res.writeHead(500, {"content-Type": "text/plain"});
              res.write("Could not write file");
              res.end()
            } else {
              res.writeHead(201, {"content-Type": "text/plain"});
              res.write("New file created");
              res.end()
            }
          })
        });
      } else {
        // file already exists
        res.writeHead(200, {"content-Type": "text/plain"});
        res.write("File already exists");
        res.end();
      }
    });
  }
}).listen(PORT);
