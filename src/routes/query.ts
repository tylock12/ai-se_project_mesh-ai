import { Router } from 
"express";
import { askQuestion } from "../controllers/query.js";
import { auth } from "../middleware/auth.js";

const queryRouter = Router();
queryRouter.use(auth);
queryRouter.post("/", askQuestion);

export { queryRouter };
