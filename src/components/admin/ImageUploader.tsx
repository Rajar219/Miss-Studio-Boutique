"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, RefreshCw } from "lucide-react";

interface ImageUploaderProps {
  folder: "products" | "collections" | "banners";
  multiple?: boolean;
  value: string | string[];
  onChange: (url: string | string[]) => void;
  maxSizeMB?: number;
}

export default function ImageUploader({ 
  folder, 
  multiple = false, 
  value, 
  onChange,
  maxSizeMB = 5
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Normalizes value to always be an array internally for easier rendering
  const images = Array.isArray(value) ? value : (value ? [value] : []);

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    if (!multiple && fileArray.length > 1) {
      alert("Please upload only one image.");
      return;
    }

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of fileArray) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File ${file.name} exceeds ${maxSizeMB}MB limit.`);
        continue;
      }

      const data = new FormData();
      data.append("file", file);
      data.append("folder", folder);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        const result = await res.json();
        
        if (res.ok) {
          newUrls.push(result.url);
        } else {
          alert(`Failed to upload ${file.name}: ${result.error}`);
        }
      } catch (error) {
        console.error("Upload failed", error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    if (multiple) {
      onChange([...images, ...newUrls]);
    } else {
      // For single upload, replace the existing one
      if (newUrls.length > 0) {
        onChange(newUrls[0]);
      }
    }
    setUploading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (indexToRemove: number) => {
    if (multiple) {
      onChange(images.filter((_, idx) => idx !== indexToRemove));
    } else {
      onChange("");
    }
  };

  const replaceImage = (indexToReplace: number, file: File) => {
    // Advanced: To replace exactly at index, we can handle it directly or just remove & upload.
    // For simplicity, we just trigger fileInput and it will append, but we can do a targeted replace.
    // Since input type="file" is used globally here, we'll let the standard add flow happen, 
    // but the user wants to "Replace".
    // A simple approach: remove it, then trigger upload.
    removeImage(indexToReplace);
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all group ${
          isDragging ? "border-wine bg-wine/5" : "border-gray-300 hover:border-wine hover:bg-wine/5"
        }`}
      >
        <div className="flex flex-col items-center text-gray-500 pointer-events-none">
          {uploading ? (
            <Loader2 size={40} className="text-wine mb-3 animate-spin" />
          ) : (
            <UploadCloud size={40} className={`mb-3 transition-colors ${isDragging ? "text-wine" : "text-gray-400 group-hover:text-wine"}`} />
          )}
          <p className={`font-medium transition-colors ${isDragging ? "text-wine" : "group-hover:text-wine"}`}>
            {uploading ? "Uploading..." : isDragging ? "Drop images here" : `Click or drag to upload ${multiple ? "images" : "an image"}`}
          </p>
          <p className="text-sm text-gray-400 mt-1">PNG, JPG up to {maxSizeMB}MB</p>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files || new FileList())}
        />
      </div>

      {images.length > 0 && (
        <div className={`grid gap-4 mt-6 ${multiple ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}>
          {images.map((src, index) => (
            <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 group bg-gray-50">
              <Image src={src} alt={`Upload ${index}`} fill className="object-cover" />
              
              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  type="button"
                  title="Replace"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    if (multiple) {
                      removeImage(index);
                      fileInputRef.current?.click();
                    } else {
                      fileInputRef.current?.click();
                    }
                  }}
                  className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors shadow-sm"
                >
                  <RefreshCw size={18} />
                </button>
                <button 
                  type="button"
                  title="Delete"
                  onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-sm"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
