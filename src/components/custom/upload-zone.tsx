'use client';

import { Upload, X, Loader2 } from 'lucide-react';
import { useState, useCallback } from 'react';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  loading?: boolean;
}

export function UploadZone({ onUpload, loading }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [onUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [onUpload]
  );

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#00FF00]/20 bg-[#1A1A1A] p-4">
          <button
            onClick={clearPreview}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#0D0D0D] border border-[#00FF00]/30 hover:border-[#00FF00] transition-all duration-300"
            disabled={loading}
          >
            <X className="w-5 h-5 text-[#00FF00]" />
          </button>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto rounded-xl"
          />
          {loading && (
            <div className="absolute inset-0 bg-[#0D0D0D]/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-[#00FF00] animate-spin mx-auto mb-4" />
                <p className="text-white font-inter">Analisando multa...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 ${
            dragActive
              ? 'border-[#00FF00] bg-[#00FF00]/5'
              : 'border-[#00FF00]/30 hover:border-[#00FF00]/60'
          } bg-[#1A1A1A] p-12`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
            disabled={loading}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#00FF00]/10 flex items-center justify-center mb-6 group-hover:bg-[#00FF00]/20 transition-all duration-300">
              <Upload className="w-10 h-10 text-[#00FF00]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 font-inter">
              Arraste sua foto aqui
            </h3>
            <p className="text-gray-400 text-sm font-inter mb-4">
              ou clique para selecionar
            </p>
            <p className="text-[#00FF00] text-xs font-inter">
              PNG, JPG ou JPEG (máx. 10MB)
            </p>
          </label>
        </div>
      )}
    </div>
  );
}
