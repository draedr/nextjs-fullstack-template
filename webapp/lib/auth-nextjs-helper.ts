import { config } from "@/lib/auth";
import getServerSession from 'next-auth';

export async function getServerSideProps(context: any) {
  const session = await getServerSession(config)

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}