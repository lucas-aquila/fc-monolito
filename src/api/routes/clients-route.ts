import express, {Request, Response} from "express";
import ClientAdmAddClientUseCase from "../../modules/client-adm/usecase/add-client/add-client.usecase";
import ClientAdmClientRepository from "../../modules/client-adm/repository/client.repository"

export const ClientRoutes = express.Router();

ClientRoutes.post("/", async (req: Request, res: Response) => {
  const usecase = new ClientAdmAddClientUseCase(new ClientAdmClientRepository());
  const output = await usecase.execute({
    name: req.body.name,
    email: req.body.email,
    document: req.body.document,
    street: req.body.street,
    number: req.body.number,
    complement: req.body.complement,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
  });
  res.send(output);
});