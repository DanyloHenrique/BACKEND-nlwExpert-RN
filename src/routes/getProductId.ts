import { Request, Response, Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/getProductId/:idProduct", async (req: Request, res: Response) => {
  try {
    console.log(req.params.idProduct);

    // const product = await prisma.product.delete({
    //   where: {
    //    id: req.params.idProduct,

    //   },
    // })

    const product = await prisma.product.findUnique({
      where: {
        id: req.params.idProduct,
      },
      include: {
        cover: true,
        thumbnail: true,
      },
    });

    return res.status(200).send({ product: product });
  } catch (error) {
    console.log("erro ao obter lanches:", error);
    return res.status(500).send("erro interno no servidor");
  }
});

export default router;
