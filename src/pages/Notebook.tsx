import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UploadModal from "./UploadModal";
import NotebookPage from "../notebook/NotebookPage";

type Notebook = {
  id: string;
  title: string;
  updatedAt: string;
  notes: string;
};


const initialNotebooks: Notebook[] = [
  {
    id: "ml-notes",
    title: "Machine Learning Notes",
    updatedAt: "2 hours ago",
    notes: "Hi it's me",
  },
  {
    id: "dbms-midsem",
    title: "DBMS Mid Sem",
    updatedAt: "Yesterday",
    notes: "We are going good",
  },
  {
    id: "ai-research",
    title: "AI Research Paper",
    updatedAt: "3 days ago",
    notes: "Let's ace it!",
  },
];

const Notebook = () => {
  const [notebooks, setNotebooks] = useState(initialNotebooks);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const navigate = useNavigate();
  const { notebookId } = useParams();

  const activeNotebook =
    notebooks.find((n) => n.id === notebookId) ?? null;

  // 🗑 DELETE
  const deleteNotebook = (id: string) => {
    setNotebooks((prev) => prev.filter((n) => n.id !== id));
    navigate("/notebooks");
  };

  // ✏️ RENAME
  const renameNotebook = (id: string) => {
    const newTitle = prompt("Enter new notebook name");
    if (!newTitle) return;

    setNotebooks((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, title: newTitle } : n
      )
    );
  };

  return (
    <>
      <div className="flex h-[calc(100vh-64px)]">

        {/* ===== SIDEBAR ===== */}
        <aside className="w-72 p-4 border-r bg-white dark:bg-slate-900 dark:border-slate-700">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold dark:text-white">My Notebooks</h2>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="text-sm px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
            >
              + New
            </button>
          </div>

          {notebooks.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-lg border mb-2 ${
          notebookId === n.id
            ? "bg-purple-50 border-purple-400 dark:bg-purple-900 dark:border-purple-600"
            : "hover:bg-gray-100 dark:hover:bg-slate-800"
              } dark:bg-slate-800 dark:border-slate-700`}
            >
              <button
          onClick={() => navigate(`/notebooks/${n.id}`)}
          className="w-full text-left"
              >
          <p className="font-medium dark:text-white">{n.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Updated {n.updatedAt}
          </p>
              </button>

              {notebookId === n.id && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => renameNotebook(n.id)}
              className="text-xs text-blue-600 dark:text-blue-400"
            >
              Rename
            </button>
            <button
              onClick={() => deleteNotebook(n.id)}
              className="text-xs text-red-600 dark:text-red-400"
            >
              Delete
            </button>
          </div>
              )}
            </div>
          ))}
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 p-8 overflow-y-auto">
          <NotebookPage
            notebook={activeNotebook}
            onUpdateNotes={(newNotes) => {
              if (!notebookId) return;
              setNotebooks((prev) =>
                prev.map((n) =>
                  n.id === notebookId
                    ? { ...n, notes: newNotes }
                    : n
                )
              );
            }}
          />
        </main>
      </div>

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </>
  );
};

export default Notebook;
