"use client";
import { VscLoading } from "react-icons/vsc";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { NEXT_API_URL } from "@/utils/apiURL";

const Refresh_auth = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();

  useEffect(() => {
    const refresh_auth = async () => {
      const request = await fetch(`${NEXT_API_URL}/user/revalidateSession`, {
        method: "GET",
        credentials: "include",
      });

      if (!request.ok) {
        router.replace("/login");
        return null;
      }

      router.replace(redirect || "/profile");
    };

    refresh_auth();
  }, []);

  return (
    <div className="w-full h-dvh p-3 text-blue-700 bg-white flex items-center justify-center gap-x-2.5 m-auto">
      <VscLoading className="animate-spin text-9xl" />
    </div>
  );
};
export default Refresh_auth;
