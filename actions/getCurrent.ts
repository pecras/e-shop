import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb"

export async function getSsession() {
return await getServerSession(authOptions)    
}

export async function getCurrentUser(){
    try{
        const session =await getSsession()
        if (!session?.user?.email)
        {return null
        }

        const currentUser= await prisma.user.findUnique({
            where: {
                email: session?.user?.email,

            }
        });

        if(!currentUser){ return null

        } 
        return{
            ...currentUser,
            createdAt:currentUser.createdAt.toISOString(),
            updeatAt:currentUser.updatedAt.toISOString(),
            emailVerified:currentUser.emailVerified?.toString()||null
        };
    } catch(error:any){return null}
}

