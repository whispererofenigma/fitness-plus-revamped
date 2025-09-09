// src/app/api/r2-upload/route.ts

import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

// Ensure all required environment variables are present
if (
  !process.env.CLOUDFLARE_ACCOUNT_ID ||
  !process.env.R2_ACCESS_KEY_ID ||
  !process.env.R2_SECRET_ACCESS_KEY ||
  !process.env.NEXT_PUBLIC_R2_BUCKET_NAME
) {
  throw new Error('Cloudflare R2 environment variables are not fully configured.');
}

// Initialize the S3 client for Cloudflare R2
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.NEXT_PUBLIC_R2_BUCKET_NAME;

/**
 * This generic API route generates a presigned URL for uploading a file to R2.
 * It accepts a `fileType` and an optional `folder` to organize uploads.
 *
 * @example
 * POST /api/r2-upload
 * Body: { "fileType": "image/jpeg", "folder": "testimonials" }
 *
 * @returns { "url": "https://...", "key": "testimonials/..." }
 */
export async function POST(request: Request) {
  try {
    const { fileType, folder = 'general' } = await request.json();

    if (!fileType || typeof fileType !== 'string') {
      return NextResponse.json({ error: 'fileType is required and must be a string' }, { status: 400 });
    }

    const fileExtension = fileType.split('/')[1];
    if (!fileExtension) {
        return NextResponse.json({ error: 'Invalid fileType format' }, { status: 400 });
    }

    // Generate a unique, secure file name using crypto
    const uniqueFileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`;
    
    // The key is the full path in the bucket, including the folder.
    const key = `${folder}/${uniqueFileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    // The presigned URL is valid for 1 hour.
    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return NextResponse.json({
      url: presignedUrl,
      key: key // Return the key to the client to store in the database
    });

  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
  }
}