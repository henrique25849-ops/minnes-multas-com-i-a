'use client';

import { Upload, X, Loader2, Sparkles } from 'lucide-react';
import { useState, useCallback } from 'react';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  loading?: boolean;
}

export function UploadZone({ onUpload, loading }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        onUpload(file);
      }
    },
    [onUpload]
  );

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
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#00FF00]/30 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] p-4 shadow-2xl">
          <button
            onClick={clearPreview}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#0D0D0D] border border-[#00FF00]/30 hover:border-[#00FF00] hover:bg-[#00FF00]/10 transition-all duration-300 hover:scale-110"
            disabled={loading}
          >
            <X className="w-5 h-5 text-[#00FF00]" />
          </button>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto rounded-xl shadow-lg"
          />
          {loading && (
            <div className="absolute inset-0 bg-[#0D0D0D]/90 backdrop-blur-md flex items-center justify-center rounded-xl">
              <div className="text-center">
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-[#00FF00] animate-spin mx-auto mb-4" />
                  <Sparkles className="w-6 h-6 text-[#00FF00] absolute top-0 right-0 animate-pulse" />
                </div>
                <p className="text-white font-inter text-lg font-semibold mb-2">
                  Analisando multa com IA...
                </p>
                <p className="text-gray-400 text-sm">
                  Isso pode levar alguns segundos
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 ${
            dragActive
              ? 'border-[#00FF00] bg-[#00FF00]/10 scale-[1.02]'
              : 'border-[#00FF00]/30 hover:border-[#00FF00]/60 hover:bg-[#00FF00]/5'
          } bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] p-12 shadow-xl hover:shadow-2xl hover:shadow-[#00FF00]/10 cursor-pointer`}
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
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00FF00]/20 to-[#00FF00]/10 flex items-center justify-center group-hover:from-[#00FF00]/30 group-hover:to-[#00FF00]/20 transition-all duration-300 shadow-lg shadow-[#00FF00]/20">
                <Upload className="w-10 h-10 text-[#00FF00]" />
              </div>
              <Sparkles className="w-5 h-5 text-[#00FF00] absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 font-inter">
              Arraste sua foto aqui
            </h3>
            <p className="text-gray-400 text-sm font-inter mb-4">
              ou clique para selecionar do seu dispositivo
            </p>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF00]/10 border border-[#00FF00]/30">
              <span className="text-[#00FF00] text-xs font-inter font-semibold">
                PNG, JPG ou JPEG (máx. 10MB)
              </span>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
