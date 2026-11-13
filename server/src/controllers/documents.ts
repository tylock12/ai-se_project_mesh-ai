import type { Request, Response } from "express";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import Document from "../models/document.js";
import Chunk from "../models/chunk.js";
import { chunkText } from "../utils/chunk.js";
import { createEmbedding } from "../utils/embeddings.js";
import { getCacheValue, setCacheValue, deleteCacheValue } from "../utils/cache.js";
import mongoose from "mongoose";

export const uploadDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.file) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: "file is required" },
    });
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
    }),
  );

  deleteCacheValue(`documents-list:${req.user!.userId}`);

  res.status(201).json({ success: true, data: document, error: null });
};

export const getDocuments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const cacheKey = `documents-list:${req.user!.userId}`;
  const cached = getCacheValue(cacheKey);
  if (cached) {
    res.status(200).json(cached);
    return;
  }

  const documents = await Document.find({ userId: req.user!.userId });
  const responseData = { success: true, data: documents, error: null };
  setCacheValue(cacheKey, responseData, 30 * 1000);
  res.status(200).json(responseData);
};

export const getDocumentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: "Invalid document ID" },
    });
    return;
  }

  const document = await Document.findOne({ _id: id, userId: req.user!.userId });
  if (!document) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: "Document not found" },
    });
    return;
  }

  res.status(200).json({ success: true, data: document, error: null });
};

export const deleteDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user!.userId;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: "Invalid document ID" },
    });
    return;
  }

  const doc = await Document.findOne({ _id: id, userId });
  if (!doc) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: "Document not found" },
    });
    return;
  }

  await Chunk.deleteMany({ documentId: doc._id });
  await Document.deleteOne({ _id: doc._id });
  deleteCacheValue(`documents-list:${userId}`);

  res.status(200).json({ success: true, data: null, error: null });
};