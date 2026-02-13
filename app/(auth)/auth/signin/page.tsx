import { LoginForm } from "@/app/(auth)/auth/_components/LoginForm";
import AuthNavbar from "../_components/authNavbar";

export default function LoginPage() {
  return (
    <>
      <AuthNavbar />

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted px-4 py-12">
        <div className="w-full max-w-lg border shadow-lg p-5 rounded-sm">
          <LoginForm />
        </div>
      </main>
    </>
  );
}
