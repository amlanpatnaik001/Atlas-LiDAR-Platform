"use client";

import { useRef, useState } from "react";
import { Upload, File, CheckCircle2, Loader2 } from "lucide-react";

type LidarMetadata = {
  point_count: number;
  srs: string | null;
  scale: number[];
  offset: number[];
};

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [metadata, setMetadata] = useState<LidarMetadata | null>(null);

  const handleFile = (selected: File | null) => {
    if (!selected) return;

    const ext = selected.name.split(".").pop()?.toLowerCase();

    if (!["las", "laz", "e57"].includes(ext || "")) {
      setStatus("Only LAS, LAZ and E57 files are supported.");
      return;
    }

    setStatus("");
    setMetadata(null);
    setFile(selected);
  };

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);
    setStatus("Uploading dataset...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(`Uploaded successfully: ${data.filename}`);
        setMetadata(data.metadata);
      } else {
        setStatus(data.detail || "Upload failed.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Backend connection failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020B22] text-white p-8">
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold">Upload Center</h1>
        <p className="mt-2 text-slate-400">
          Bring field-collected LiDAR into the Atlas processing pipeline.
        </p>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-[#071633] p-5">
          <div className="mb-5">
            <h2 className="font-semibold">Dataset Intake</h2>
            <p className="text-sm text-slate-400">
              Upload LAS, LAZ or E57 datasets for validation and processing.
            </p>
          </div>

          {/* DROP ZONE */}
          <div
            onClick={() => inputRef.current?.click()}
            onDragEnter={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleFile(e.dataTransfer.files[0] || null);
            }}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-16 transition-all duration-300 ${
              dragActive
                ? "border-blue-400 bg-[#0A234F] shadow-[0_0_30px_rgba(59,130,246,.25)]"
                : "border-slate-700 bg-[#04112C] hover:border-blue-500 hover:bg-[#06173A]"
            }`}
          >
            <div className="rounded-2xl bg-[#0A234F] p-4">
              <Upload className="h-8 w-8 text-blue-300" />
            </div>

            <p className="mt-6 text-lg font-semibold">
              Drop LAS, LAZ or E57 here
            </p>

            <p className="mt-2 text-sm text-slate-400">
              or click to browse from your computer
            </p>

            <input
              ref={inputRef}
              type="file"
              accept=".las,.laz,.e57"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
          </div>

          {/* FILE CARD */}
          {file && (
            <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-800 bg-[#091936] p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-900/30 p-2">
                  <File className="h-5 w-5 text-emerald-400" />
                </div>

                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-slate-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                    {file.name.split(".").pop()?.toUpperCase()}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-900/30 px-3 py-1 text-sm text-emerald-400">
                Ready
              </span>
            </div>
          )}

          {/* UPLOAD BUTTON */}
          <button
            onClick={uploadFile}
            disabled={!file || uploading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:bg-slate-700"
          >
            {uploading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                Upload Dataset
              </>
            )}
          </button>

          {/* STATUS */}
          {status && (
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-800 bg-[#091936] p-4">
              <CheckCircle2 className="h-5 w-5 text-blue-400" />
              <span>{status}</span>
            </div>
          )}

          {/* METADATA CARD */}
          {metadata && (
            <div className="mt-5 rounded-2xl border border-slate-800 bg-[#091936] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">LiDAR Validation</h3>
                  <p className="text-sm text-slate-400">
                    Metadata extracted successfully.
                  </p>
                </div>

                <span className="rounded-full bg-emerald-900/30 px-3 py-1 text-sm text-emerald-400">
                  Validated
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Point Count
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {metadata.point_count?.toLocaleString() || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Coordinate System
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {metadata.srs?.includes("32611")
                      ? "WGS 84 / UTM Zone 11N (EPSG:32611)"
                      : metadata.srs?.includes("4326")
                      ? "WGS 84 (EPSG:4326)"
                      : "Unknown CRS"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Scale
                  </p>
                  <p className="mt-1 font-medium">
                    {metadata.scale?.join(" × ") || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Offset
                  </p>
                  <p className="mt-1 font-medium">
                    {metadata.offset
                      ?.map((v) => v.toFixed(2))
                      .join(" • ") || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* STEPS */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-[#071633] p-5">
            <p className="text-xs tracking-wider text-blue-400">STEP 1</p>
            <h3 className="mt-3 text-xl font-semibold">Upload</h3>
            <p className="mt-2 text-sm text-slate-400">
              Capture source file securely.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#071633] p-5">
            <p className="text-xs tracking-wider text-blue-400">STEP 2</p>
            <h3 className="mt-3 text-xl font-semibold">Validate</h3>
            <p className="mt-2 text-sm text-slate-400">
              Read header, CRS and integrity.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#071633] p-5">
            <p className="text-xs tracking-wider text-blue-400">STEP 3</p>
            <h3 className="mt-3 text-xl font-semibold">Process</h3>
            <p className="mt-2 text-sm text-slate-400">
              Run PDAL/GDAL processing pipeline.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}