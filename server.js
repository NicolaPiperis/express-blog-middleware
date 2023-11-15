// importiamo express e creiamo la sua istanza
const express = require('express');
const app = express();

// importiamo dotenv e lo installiamo
const dotenv = require("dotenv");
dotenv.config();

// importiamo il log 
const { log } = require("console");

// definiamo con una variabile la porta
const port = process.env.PORT || 3001;

// configuro i file statici
app.use(express.static("public"));

// importiamo il controller
const postsController = require('./controllers/post');

// importiamo il router
const postsRouter = require('./routers/Posts');
const adminRouter = require("./routers/Admin");
const authRouter = require("./routers/Auth");

// configuro express per leggere i dati in formato json
app.use(express.json());

// configuro express per leggere i dati in formato x-www-form-urlencoded
app.use(express.urlencoded({ extended : true }));


// importiamo i middleware
const errorsFormatterMiddleware = require("./middleware/errorsFormatter");
const errorsNotFoundMiddleware = require("./middleware/routeNotFound");
const errorsLoggerMiddleware = require("./middleware/routesLogger");

app.use(errorsLoggerMiddleware);


// Rotta principale
app.get('/', (req, res) => {
  res.send('<h1 style="text-align:center">Benvenuto nel mio blog!</h1>');
});

app.get("/post", postsController.index)

// Rotte relative all'entità post
app.use("/", postsRouter);
// Rotte relative all'admin
app.use("/admin", adminRouter);
app.use("/", authRouter);

app.use(errorsFormatterMiddleware);
app.use(errorsNotFoundMiddleware);

// Avvia il server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
