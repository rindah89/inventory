import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "5MB", maxFileCount: 15 } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file", file);
    }),
};