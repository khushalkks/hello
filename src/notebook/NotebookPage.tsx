import ChatWindow from "../components/chat/ChatWindow";
import UploadModal from "../pages/UploadModal";
import NotesEditor from "./NotesEditor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Notebook = {
  id: string;
  title: string;
  updatedAt: string;
  notes: string;
};

type NotebookPageProps = {
  notebook: Notebook | null;
  onUpdateNotes: (notes: string) => void;
};

const NotebookPage = ({ notebook, onUpdateNotes }: NotebookPageProps) => {
  const navigate = useNavigate();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [notes, setNotes] = useState<string>(
    "<p>Write or edit AI-generated notes here…</p>"
  );

  /* -------------------------------
     1️⃣ NO NOTEBOOK SELECTED
  -------------------------------- */
  if (!notebook) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
  <div
    className="
      w-[560px] h-[420px]
      bg-gradient-to-br from-gray-900/70 to-gray-800/60
      border border-dashed border-gray-600
      rounded-3xl
      flex flex-col items-center justify-center
      text-center
      px-10
      gap-6
      hover:border-purple-500 hover:shadow-2xl
      transition-all
    "
  >
    {/* ICON */}
    <div className="text-6xl select-none">📂</div>

    {/* TITLE */}
    <h3 className="text-2xl font-semibold text-white">
      Upload Documents
    </h3>

    {/* DESCRIPTION */}
    <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
      Upload PDFs, DOCX, or images and let AI generate
      structured, editable notes for this notebook.
    </p>

    {/* CTA */}
    <button
      onClick={() => setIsUploadOpen(true)}
      className="
        mt-2
        px-8 py-3
        bg-purple-600 text-white
        rounded-xl
        text-sm font-medium
        hover:bg-purple-700
        transition
      "
    >
      Upload Files
    </button>

    {/* OPTIONAL SECONDARY TEXT */}
    <p className="text-xs text-gray-500">
      or drag & drop files here
    </p>

    <UploadModal
      isOpen={isUploadOpen}
      onClose={() => setIsUploadOpen(false)}
    />
  </div>
</div>
    );
  }

  /* -------------------------------
     3️⃣ NOTES EXIST → FULL NOTEBOOK UI
  -------------------------------- */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-6">

        {/* AI SUMMARY */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-purple-600 mb-2">
            📌 AI Summary
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            LLM-generated summary of uploaded documents will appear here.
          </p>
        </div>

        {/* NOTES */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">
              📝 Notes
            </h2>

            <button
              onClick={() => {
                console.log("Saving notes:", notes);
              }}
              className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Save Notes
            </button>
          </div>

          <NotesEditor
            value={notes}
            onChange={(newNotes) => {
              setNotes(newNotes);
              onUpdateNotes(newNotes);
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-6">

        {/* AI CHAT */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm h-[420px] flex flex-col">
          <h2 className="text-lg font-semibold mb-3 text-purple-600">
            🤖 Ask AI
          </h2>
          <ChatWindow notebookId={notebook.id} />
        </div>

        {/* TOOLS */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">
            Tools
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/mindmap")}
              className="p-3 rounded-lg border hover:bg-purple-50 dark:hover:bg-gray-700"
            >
              🧩 Mind Map
            </button>
            <button
              onClick={() => navigate("/quiz")}
              className="p-3 rounded-lg border hover:bg-purple-50 dark:hover:bg-gray-700"
            >
              📝 Quiz
            </button>
            <button className="p-3 rounded-lg border hover:bg-purple-50 dark:hover:bg-gray-700">
              📊 Flashcards
            </button>
            <button className="p-3 rounded-lg border hover:bg-purple-50 dark:hover:bg-gray-700">
              📚 Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotebookPage;
