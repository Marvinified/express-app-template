module.exports = (req, res, next) => {
  console.log("Request: ", req.path);
  console.log("Time: ", Date.now());
  next();
};
