import { Router } from "express";

const route = Router();

const melody = (app) => (service) => {
  app.use('/', route);

  route.get('/', (req, res) => {
    const result = service.buildRandomResult(req.query);
    return res.render("index", result);
  });
}


export default melody;