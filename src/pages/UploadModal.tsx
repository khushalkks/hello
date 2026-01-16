import { X } from "lucide-react";
import { useState } from "react";
import FileUpload from "../components/upload/FileUpload";

type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

 const handleSave = async () => {
  if (files.length === 0) return;

  setLoading(true);

  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file); // 👈 MUST be "file"

      const res = await fetch("http://127.0.0.1:8000/notebooks/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
  const text = await res.text();
  console.error("Backend error:", text);
  throw new Error(text);
}


      const data = await res.json();
      console.log("Notebook created:", data);

      // later: redirect to /notebook/:id
    }

    setFiles([]);
    onClose();
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-3xl rounded-2xl shadow-xl p-6 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Add sources
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400" />
          </button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Upload documents so AI can base its answers on what matters to you.
        </p>

        {/* Upload Card */}
        <FileUpload onFilesSelected={handleFilesSelected} />

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300
                       dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={files.length === 0 || loading}
            className={`px-4 py-2 text-sm rounded-lg text-white
              ${
                files.length === 0 || loading
                  ? "bg-purple-300 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
          >
            {loading ? "Uploading..." : "Add sources"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
