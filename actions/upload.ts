"use server";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxFileSize = 1024 * 1024 * 10  // 10 MB

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

export const getSignedURL = async (type: string, size: number, checksum: string) => {

    const session = await getServerSession(options);

    if (!session) {
        return { failure: "Not authenticated" }
    }

    if (!acceptedTypes.includes(type)) {
        return { failure: "Invalid file type" }
    }

    if (size > maxFileSize) {
        return { failure: "File too large" }
    }

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: generateFileName(),
        ContentType: type,
        ContentLength: size,
        ChecksumSHA256: checksum,
        Metadata: {
            userId: session?.user.id as string,
        }
    });

    const signedURL = await getSignedUrl(s3, putObjectCommand, {
        expiresIn: 60,
    });

    const fileURL = signedURL.split("?")[0];

    return { success: { url: signedURL, fileURL } };

}

export const deleteFile = async (fileURL: string) => {

    const session = await getServerSession(options);

    if (!session) {
        return { failure: "Not authenticated" }
    }
    // console.log("fileurl: ", fileURL);

    const url = new URL(fileURL);
    const key = url.pathname.substring(1);
    // console.log("key: ", key);

    const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
    });

    await s3.send(deleteObjectCommand)

}
