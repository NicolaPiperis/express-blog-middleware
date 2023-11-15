module.exports = (req, res, next) => {

    // res.status(404).send("<h1>404 Not Found</h1>");
  
    res.format({
      json: () => {
        res.status(404).json({
          message: "Errore di tipo 404"
        });
      },
      default: () => {
        res.status(404).send("<h1>Errore di tipo 404</h1>");
      },
    })
  }