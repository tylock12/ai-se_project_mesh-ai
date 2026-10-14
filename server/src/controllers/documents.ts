import type { Request, Response } from 'express';
import fs from 'fs';
import { PDFParse } from 'pdf-parse';
import Document from '../models/document.js';
import Chunk from '../models/chunk.js';
import { chunkText } from '../utils/chunk.js';
import { createEmbedding } from '../utils/embeddings.js';

export const uploadDocument = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ success: false, data: null, error: { message: 'file is required' } });
    return;
  }

  const fileBuffer = fs.readFileSync(req.file.path);
  const parser = new PDFParse({ data: fileBuffer });
  const result = await parser.getText();
  const fullText = result.text;

  const document = await Document.create({
    title: req.file.originalname,
    fileName: req.file.originalname,
    userId: req.user!.userId,
  });

 const chunks = chunkText(fullText);

  await Promise.all(
    chunks.map(async (text) => {
      const embedding = await createEmbedding(text);
      return Chunk.create({ documentId: document._id, text, embedding });
    })
  );

  res.status(201).json({ success: true, data: document, error: null });
};

export const getDocuments = async (req: Request, res: Response): Promise<void> => {
  const documents = await Document.find({ userId: req.user!.userId });
  res.status(200).json({ success: true, data: documents, error: null });
};

export const getDocumentById = (req: Request, res: Response): void => {
  res.status(200).json({ success: true, data: {}, error: null });
};

export const deleteDocument = (req: Request, res: Response): void => {
  res.status(204).end();
};
