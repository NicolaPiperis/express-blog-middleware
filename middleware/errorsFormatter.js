module.exports = (err, req, res, next) => {
    res.format({
        json: () => {
          res.status(500).json({
            message: "Errore generico",
            error: err.message,
          });
        },
        default: () => {
          res.status(500).send("<h1>Errore generico</h1>");
        },
      });

}