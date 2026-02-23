import { config } from "@/lib/auth";
import getServerSession from 'next-auth';
import { redirect, RedirectType } from "next/dist/client/components/navigation";

export async function getServerSideProps(context: any) {
  const session = await getServerSession(config)

  if (!session) {
    redirect('/api/auth/signin', RedirectType.replace)
  }

  return {
    props: {
      session,
    },
  }
}