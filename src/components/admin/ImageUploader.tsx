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
    removeImage(indexToReplace);
    fileInputRef.current?.click();
  };

  const setAsPrimary = (index: number) => {
    if (!multiple || index === 0) return;
    const newImages = [...images];
    const [item] = newImages.splice(index, 1);
    newImages.unshift(item);
    onChange(newImages);
  };

  const moveLeft = (index: number) => {
    if (!multiple || index === 0) return;
    const newImages = [...images];
    const temp = newImages[index - 1];
    newImages[index - 1] = newImages[index];
    newImages[index] = temp;
    onChange(newImages);
  };

  const moveRight = (index: number) => {
    if (!multiple || index === images.length - 1) return;
    const newImages = [...images];
    const temp = newImages[index + 1];
    newImages[index + 1] = newImages[index];
    newImages[index] = temp;
    onChange(newImages);
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
            <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 group bg-gray-50 shadow-sm">
              <Image src={src} alt={`Upload ${index}`} fill className="object-cover" />
              
              {/* Primary Badge */}
              {multiple && index === 0 && (
                <div className="absolute top-2 left-2 bg-wine text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm shadow-md z-10">
                  Primary
                </div>
              )}

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-end">
                  <button 
                    type="button"
                    title="Delete"
                    onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                    className="bg-red-500/90 text-white p-1.5 rounded hover:bg-red-600 transition-colors shadow-sm"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-1">
                    {multiple && index > 0 && (
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); moveLeft(index); }}
                        className="bg-white/90 text-gray-900 px-2 py-1 rounded text-xs hover:bg-white transition-colors shadow-sm font-medium"
                      >
                        ←
                      </button>
                    )}
                    {multiple && index < images.length - 1 && (
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); moveRight(index); }}
                        className="bg-white/90 text-gray-900 px-2 py-1 rounded text-xs hover:bg-white transition-colors shadow-sm font-medium"
                      >
                        →
                      </button>
                    )}
                  </div>
                  
                  {multiple && index > 0 && (
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setAsPrimary(index); }}
                      className="bg-white/90 text-gray-900 px-2 py-1 rounded text-xs hover:bg-white transition-colors shadow-sm font-medium"
                    >
                      Make Primary
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
