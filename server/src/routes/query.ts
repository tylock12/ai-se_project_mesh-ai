import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { askQuestion } from "../controllers/query.js";

const queryRouter = Router();
queryRouter.use(auth);
queryRouter.post("/", askQuestion);

export { queryRouter };
