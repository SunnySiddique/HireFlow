import { SignupForm } from "@/app/(auth)/auth/_components/SignupForm";
import { Suspense } from "react";
import AuthNavbar from "../_components/authNavbar";

const SignupPage = () => {
  return (
    <>
      <AuthNavbar />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted px-4 py-12">
        <div className="w-full max-w-lg border shadow-lg p-5 rounded-sm">
          <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default SignupPage;
