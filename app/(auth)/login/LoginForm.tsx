"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function LoginForm({ csrfToken }: any) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
    });

    setMessage(
      result?.error ? result.error : "You have successfully signed in!"
    );
    setLoading(false);
  };

  return (
    <div className="my-3">
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <Button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
