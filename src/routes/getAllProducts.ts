import { Request, Response, Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/getAllProducts", async (req: Request, res: Response) => {
  try {
    const product = await prisma.menu.findMany();
    const menu = await prisma.menu.findMany({
      include: {
        product: {
          include: {
            cover: true,
            thumbnail: true,
          },
        },
      },
    });

    return res.status(200).send({ menu: menu, product: product });
  } catch (error) {
    console.log("erro ao obter lanches:", error);
    return res.status(500).send("erro interno no servidor");
  }
});

export default router;
