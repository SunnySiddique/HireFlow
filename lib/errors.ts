import toast from "react-hot-toast";

export function toError(error: unknown): never {
  if (error instanceof Error) throw error;
  throw new Error(String(error));
}

export const handleQueryError = (error: any) => {
  if (error?.message === "UNAUTHORIZED") {
    toast.error("Please login first");
    window.location.href = "/auth/signin";
    return;
  }

  toast.error(error?.message || "Something went wrong");
};
