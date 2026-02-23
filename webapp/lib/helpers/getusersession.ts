import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import { redirect, RedirectType } from "next/dist/client/components/navigation";

export async function getUserSession() {
  const session = await auth(); 
  
  if(!session) {
      redirect('/api/auth/signin', RedirectType.replace)
  }

  return session;
}