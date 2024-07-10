"use server";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.CLOUD_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.CLOUD_ACCESS_KEY!,
        secretAccessKey: process.env.CLOUD_SECRET_ACCESS_KEY!,
    },
});

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxFileSize = 1024 * 1024 * 10  // 10 MB

const generateFileName = (originalFileName: string, userID: string, bytes = 32) => {
    const fileExtension = originalFileName.split('.').pop();
    // const uniqueName = crypto.randomBytes(bytes).toString("hex");
    const uniqueName = userID

    return `${uniqueName}.${fileExtension}`;
}

export const getSignedURL = async (type: string, size: number, checksum: string, originalFileName: string) => {

    const session = await getServerSession(options);
    console.log("aws 1", 'getSignedURL', process.env.CLOUD_BUCKET_NAME!);
    if (!session) {
        return { failure: "Not authenticated" }
    }

    if (!acceptedTypes.includes(type)) {
        return { failure: "Invalid file type" }
    }

    if (size > maxFileSize) {
        return { failure: "File too large" }
    }
    console.log('aws 2', 'getSignedURL');
    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.CLOUD_BUCKET_NAME!,
        Key: generateFileName(originalFileName, session?.user?.id!),

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
    console.log('aws 3', 'deleteFile', process.env.CLOUD_ACCESS_KEY!, process.env.CLOUD_SECRET_ACCESS_KEY!, process.env.CLOUD_BUCKET_REGION!);


    const session = await getServerSession(options);
    console.log('aws 4', 'deleteFile');

    if (!session) {
        return { failure: "Not authenticated" }
    }
    console.log('aws 5', 'deleteFile');

    const url = new URL(fileURL);
    const key = url.pathname.substring(1);
    console.log('aws 6', 'deleteFile');

    const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.CLOUD_BUCKET_NAME!,
        Key: key,
    });
    console.log('aws 7', 'deleteFile', process.env.CLOUD_ACCESS_KEY!, process.env.CLOUD_SECRET_ACCESS_KEY!, process.env.CLOUD_BUCKET_REGION!);


    await s3.send(deleteObjectCommand)
    console.log('aws 8', 'deleteFile');


}
