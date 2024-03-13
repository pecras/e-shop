import { User } from "@prisma/client";

export type SafeUser = Omit <User, "createdAt" | "updatedAt" | "emailVerified" |"address"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    address:[]
};