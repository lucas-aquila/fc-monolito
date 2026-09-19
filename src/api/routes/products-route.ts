import express, {Request, Response} from "express";
import ProductAdmAddProductUseCase from "../../modules/product-adm/usecase/add-product/add-product.usecase";
import ProductRepository from "../../modules/product-adm/repository/product.repository"

export const ProductRoutes = express.Router();

ProductRoutes.post("/", async (req: Request, res: Response) => {
  const usecase = new ProductAdmAddProductUseCase(new ProductRepository());
  const output = await usecase.execute({
    name: req.body.name,
    description: req.body.description,
    purchasePrice: req.body.price,
    stock: req.body.stock
  });
  res.send(output);
});