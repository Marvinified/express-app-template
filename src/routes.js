const routes = [
  {
    method: "GET",
    path: "/",
    handler: require("./controllers/sayHello"),
    // middlewares: ["auth"],
  },
];

module.exports = routes;
