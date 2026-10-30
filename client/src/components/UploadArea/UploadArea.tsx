import "./UploadArea.css";
import uploadIcon from "../../assets/upload.svg";

type Props = {
  onFileSelect: (file: File) => void | Promise<void>;
  isUploading: boolean;
};

export default function UploadArea({ onFileSelect, isUploading }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = ""; // lets the same file be picked again
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isUploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      className="upload-area"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <label className="upload-area__label">
        <img className="upload-area__icon" src={uploadIcon} alt="Upload icon" />
        {isUploading ? (
          <span>Uploading...</span>
        ) : (
          <>
            <span>Drag and drop a PDF, or </span>
            <span className="underline">Upload</span>
          </>
        )}
        <input
          type="file"
          accept=".pdf"
          disabled={isUploading}
          className="upload-area__input"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}