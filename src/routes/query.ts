import { Router } from 
"express";
import { askQuestion } from "../controllers/query.js";

const queryRouter = Router();
queryRouter.post("/", askQuestion);

export { queryRouter };
