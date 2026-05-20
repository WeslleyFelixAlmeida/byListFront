"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { NEXT_API_URL } from "@/utils/apiURL";
import Loading from "@/components/loading";

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

  return <Loading />;
};
export default Refresh_auth;
