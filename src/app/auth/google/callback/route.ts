import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  redirect(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google/callback?code=${code}`
  );
};
