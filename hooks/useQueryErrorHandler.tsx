import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useQueryErrorHandler = () => {
  const router = useRouter();

  return (error: any) => {
    if (error?.message === "UNAUTHORIZED") {
      toast.error("Please login first");
      router.push("/auth/signin");
      return;
    }

    toast.error(error?.message || "Something went wrong");
  };
};
