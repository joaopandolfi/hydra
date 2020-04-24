const router = require('express').Router();

router.all('/*', (req, res, next) => {
    var host = req.header("host");
    if (host.match(/^www\..*/i)) {
      res.writeHead(301, { "Location": "https://" + req.headers['host'].replace("www.","") + req.url });    
    } else {
      next();
    }
  })


module.exports = router