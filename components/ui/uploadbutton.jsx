'use client';

import React from 'react';
import { generateUploadButton } from "@uploadthing/react";

const UploadButtonComponent = generateUploadButton();

export function UploadButton({ onUploadComplete, maxFiles = 5, maxSize = 5 }) {
  return (
    <div className="space-y-4">
      <UploadButtonComponent
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          onUploadComplete(res);
        }}
        onUploadError={(error) => {
          console.error("Error: ", error);
          alert(`ERROR! ${error.message}`);
        }}
      />
      <p className="text-sm text-gray-500">
        You can upload a maximum of {maxFiles} files, {maxSize}MB each
      </p>
    </div>
  );
}