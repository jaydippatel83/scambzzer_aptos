import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const next = url.searchParams.get("next") ?? "/";

  redirect(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/confirm?token_hash=${token_hash}&type=${type}&next=${next}`
  );
};
