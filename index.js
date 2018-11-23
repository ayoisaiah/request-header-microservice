const http = require("http");
const fs = require("fs");

const requestHandler = (req, res) => {
  if (req.url === "/") {
    fs.readFile("views/index.html", "utf8", (err, html) => {
      if (err) throw err;

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });
  } else if (req.url === "/api/whoami" || req.url === "/api/whoami/") {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const headers = {
      ipaddress: ip,
      language: req.headers["accept-language"],
      software: req.headers["user-agent"]
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(headers));
  } else {
    fs.readFile("views/404.html", "utf8", (err, html) => {
      if (err) throw err;

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });
  }
};

const server = http.createServer(requestHandler);

server.listen(process.env.PORT || 4100, err => {
  if (err) throw err;

  console.log(`Server is now running on PORT ${server.address().port}`);
});
