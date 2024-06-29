import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

export type { Post } from '@prisma/client'; // 必要に応じてモデルの型をエクスポートする
