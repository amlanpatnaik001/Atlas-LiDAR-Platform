"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const uploadFile = async () => {
    if (!file) return;

    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(`Uploaded successfully: ${data.filename}`);
      } else {
        setStatus(data.detail || "Upload failed.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Backend connection failed.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Upload LiDAR Dataset</h1>

      <div className="max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-8">
        <input
          type="file"
          accept=".las,.laz,.e57"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-6 block w-full"
        />

        {file && (
          <div className="mb-6 rounded-xl bg-slate-800 p-4">
            <p>
              <strong>Name:</strong> {file.name}
            </p>
            <p>
              <strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {file.name.split(".").pop()?.toUpperCase()}
            </p>
          </div>
        )}

        <button
          onClick={uploadFile}
          disabled={!file}
          className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 disabled:bg-slate-700"
        >
          Upload Dataset
        </button>

        {status && (
          <div className="mt-6 rounded-lg bg-slate-800 p-3 text-blue-300">
            {status}
          </div>
        )}
      </div>
    </main>
  );
}