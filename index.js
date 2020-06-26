const express = require("express");
const routes = require("./src/routes");
const mwares = require("./src/middlewares");
const app = express();
const port = 3000;
const router = express.Router();
// Json Parser
express.json();

// register global router
router.use(mwares.logger);

// define the home page route
routes.map(({ method, path, handler, middlewares }) => {
  const mds = middlewares || [];

  switch (method.toUpperCase()) {
    case "GET":
      // register middleware
      mds.map((md) => {
        router.get(path, mwares[md]);
      });
      // Register Route
      router.get(path, handler);
      break;
    case "POST":
      // register middleware
      mds.map((md) => {
        router.post(path, mwares[md]);
      });
      router.post(path, handler);
      break;
    case "DELETE":
      // register middleware
      mds.map((md) => {
        router.delete(path, mwares[md]);
      });
      router.delete(path, handler);
      break;
    case "PATCH":
      // register middleware
      mds.map((md) => {
        router.patch(path, mwares[md]);
      });
      router.patch(path, handler);
      break;
    default:
      break;
  }
});

// Unregistered route
router.all("*", (req, res) => {
  res.status(404).json({
    message: "The Route you seek, is lost in the universe!!!",
  });
});

// define the about route
app.use(router);

// Port
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
