"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthGuard = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Anda harus login terlebih dahulu!");
        setIsAuthorized(false);
        router.replace("/");
      } else {
        setIsAuthorized(true);
      }
    };

    const timeout = setTimeout(checkToken, 0);
    return () => clearTimeout(timeout);
  }, [router]);

  return isAuthorized;
};
