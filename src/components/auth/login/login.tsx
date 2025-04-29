import { AuthService } from "@/apis/auth/board/authService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function Login() {
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => await AuthService.login(email, password),
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.token);
      setError(null);
      // Optionally redirect or show success
    },
    onError: (err: any) => {
      setError("Invalid username or password.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("username") as string;
    const password = formData.get("password") as string;
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Enter your username and password below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="username"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.status === "pending"}
            >
              {mutation.status === "pending" ? "Signing in..." : "Login"}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="hover:underline">
                Register
              </a>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default Login;
