import { Request, Response, Router } from "express";
import { prisma } from "../lib/prisma";
import z, { AnyZodObject } from "zod";

const router = Router();

//validação
const dataScheme = z.object({
  title: z.string(),
});

router.post("/createMenu", async (req: Request, res: Response) => {
  //title vem do req.body, mas antes passa pela validação feita acima
  const { title } = dataScheme.parse(req.body);

  try {
    // cria um dado com o prisma na tabela menu e retorna para a const menu
    const menu = await prisma.menu.create({
      data: {
        title,
      },
    });
    //envia para o frontend o id do menu
    return res.status(201).send({ idMenu: menu.id });
  } catch (error) {
    console.log("ocorreu o erro: ", error);
    return res.status(500).send({ erro: error });
  }
});

export default router;
