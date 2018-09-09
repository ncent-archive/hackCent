const sponsorsController = require('../controllers').sponsorsController;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the jobCent API!"
    })
  );

  app.post("/api/sponsors", sponsorsController.create);
};
