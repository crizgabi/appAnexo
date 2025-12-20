import { PutObjectCommand } from "@aws-sdk/client-s3";
import { R2 } from "../middlewares/R2.js";
import path from "path";

export class UploadService {
  static async uploadImage(file) {

    const ext = path.extname(file.originalname);

    const safeName = file.originalname
      .replace(ext, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "");

    const fileKey = `${Date.now()}-${safeName}${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.CF_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await R2.send(command);

    return {
      key: fileKey,
      url: `${process.env.CF_PUBLIC_URL}/${fileKey}`,
    };
  }
}