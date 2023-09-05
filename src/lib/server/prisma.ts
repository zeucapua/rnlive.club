import { PrismaClient } from "@prisma/client";
import DATABASE_URL from "$env/static/private";

export const prisma_client = new PrismaClient(DATABASE_URL);
