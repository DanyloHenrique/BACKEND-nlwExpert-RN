import { Request, Response, Router } from "express";
import { prisma } from "../lib/prisma";
import z from "zod";

const multer = require("multer");
const router = Router();

interface MulterRequest extends Request {
  file: any;
}

//============VALIDAÇÃO DE DADOS COM ZOD
// const dataScheme = z.object({
//   menuId: z.string().uuid(),
//   title: z.string(),
//   category: z.string(),
//   price: z.number(),
//   cover: z.string(),
//   thumbnail: z.string(),
//   description: z.string(),
//   ingredients: z.array(z.string()),
// });

//============CONFIGURAÇÕES DE ARMAZENAMENTO DAS IMAGENS
const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: File,
    cb: (arg0: null, arg1: string) => void
  ) {
    cb(null, "uploads/");
  },
  filename: function (
    req: Request,
    file: File,
    cb: (arg0: null, arg1: string) => void
  ) {
    // Extração da extensão do arquivo original:
    const extensaoArquivo = file.originalname.split(".")[1];

    // Cria um código randômico que será o nome do arquivo
    const novoNomeArquivo = require("crypto").randomBytes(64).toString("hex");

    // Indica o novo nome do arquivo:
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  },
});
const upload = multer({ storage });

//============DEFININDO OS CAMPOS DO FROM QUE SERAO PARA IMAGENS
const cpUpload = upload.fields([
  { name: "cover", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

router.post("/createProduct", cpUpload, async (req: Request, res: Response) => {
  try {
    //força que o campo price seja numerico
    Number(req.body.price);

    //pega os dados de texto que foram enviando pelo form
    const { menuId, title, category, price, description, ingredients } =
      req.body;

    //pega os arquivos de foto que foram enviados pelo form
    const cover = req.files["cover"];
    const thumbnail = req.files["thumbnail"];

    //separa os ingredientes para colocalos em um array
    let ingredientsArray = ingredients.split(",");
    if (ingredients.lenght > 0) {
      ingredientsArray = null;
    }

    const createdProduct = await prisma.product.create({
      data: {
        title,
        category,
        price: parseFloat(price), // Converta o preço para float
        description,
        ingredients: ingredientsArray,
        menuId,
        cover: {
          createMany: {
            data: {
              nome: cover[0].originalname,
              tipo: cover[0].mimetype,
              caminho: cover[0].path,
            },
          },
        },
        thumbnail: {
          createMany: {
            data: {
              nome: thumbnail[0].originalname,
              tipo: thumbnail[0].mimetype,
              caminho: thumbnail[0].path,
            },
          },
        },
      },
    });

    return res.status(201).send({ produto: createdProduct });
  } catch (error) {
    console.log("ocorreu o erro: ", error);
    return res.status(500).send({ error: error });
  }
});

export default router;
