import express from "express";
const path = require("path");
import bodyParser from "body-parser";

import createProduct from "./routes/createProduct";
import createMenu from "./routes/createMenu";
import getAllProducts from "./routes/getAllProducts";
import getProductId from "./routes/getProductId";
import deleteProduct from "./routes/deleteProduct";

const app = express();
app.use(express.json());

//configura o middleware bodyparser para poder acessar o conteudo dos formularios
//enviados pelos usuarios com o metodo POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração para servir arquivos estáticos do diretório 'uploads'
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "uploads"))
);

app.use(createMenu);
app.use(createProduct);
app.use(getAllProducts);
app.use(getProductId);
app.use(deleteProduct);

const port = 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando em: http://0.0.0.0:${port}`);
});
