import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2.config";

export const getFile = async (key: string) => {
  const response = await r2.send(
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    })
  );
  return response.Body;
};