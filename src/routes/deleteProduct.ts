import { Request, Response, Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/deleteProduct/:idProduct", async (req: Request, res: Response) => {
  try {
    const { idProduct } = req.params;

    // Primeiro, encontre e exclua as coberturas associadas ao sorvete
    await prisma.cover.deleteMany({
      where: {
        productId: idProduct, // ID do sorvete
      },
    });

    // Em seguida, exclua as miniaturas associadas ao sorvete
    await prisma.thumbnail.deleteMany({
      where: {
        productId: idProduct, // ID do sorvete
      },
    });

    // Finalmente, exclua o sorvete
    const product = await prisma.product.delete({
      where: {
        id: idProduct,
      },
    });

    return res.status(200).send({ product: product });
  } catch (error) {
    console.log("erro ao obter lanches:", error);
    return res.status(500).send("erro interno no servidor");
  }
});

export default router;
