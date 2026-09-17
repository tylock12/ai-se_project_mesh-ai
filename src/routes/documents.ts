import { Router } from "express";
import { uploadDocument, listDocuments, getDocumentById, deleteDocument } from "../controllers/documents.js";

const documentsRouter = Router();
documentsRouter.post("/", uploadDocument);
documentsRouter.get("/", listDocuments);
documentsRouter.get("/:id", getDocumentById);
documentsRouter.delete("/:id", deleteDocument);

export { documentsRouter };
