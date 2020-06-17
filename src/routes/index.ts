import { Router } from "express";

const routes = Router();

routes.get("/", (request, response) =>
  response.json({ message: "Hello Quake 3 Arena!" })
);

export default routes;
