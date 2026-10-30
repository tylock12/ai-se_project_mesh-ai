import { useState, useEffect } from "react";
import "./KnowledgeBase.css";
import UploadArea from "../../components/UploadArea/UploadArea";
import type { KnowledgeDoc } from "../../utils/api";
import { getDocuments, uploadDocument } from "../../utils/api";


export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {}, [documents]);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const res = await getDocuments();
        setDocuments(res.data || []);
      } catch {
        setError("Failed to load documents.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const handleFileSelect = async (file: File) => {
  setIsUploading(true);
  setError("");
  try {
    const res = await uploadDocument(file);
    const newDoc = res.data;
    if (newDoc) {
      setDocuments((prev) => [newDoc, ...prev]);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : "Upload failed");
  } finally {
    setIsUploading(false);
  }
};

  return (
    <div className="knowledge-base">
      <h1>Manage Your Knowledge Base</h1>
      <section className="knowledge-base__content">
        <p>Upload documents (PDF)</p>
        <UploadArea onFileSelect={handleFileSelect} isUploading={isUploading} />
        {isLoading && <p>Loading...</p>}

        {!isLoading && error && (
          <p className="knowledge-base__error">{error}</p>
        )}

        {!isLoading && !error && documents.length === 0 && (
          <p>No documents yet.</p>
        )}

        {!isLoading && !error && documents.length > 0 && (
          <ul className="knowledge-base__list">
            {documents.map((doc) => (
              <li key={doc._id} className="knowledge-base__doc">
                {doc.fileName}
                <button
                  className="knowledge-base__delete"
                  type="button"
                  aria-label={`Delete ${doc.fileName}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
        <button className="knowledge-base__save">Save</button>
      </section>
    </div>
  );
}
