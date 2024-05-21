"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function ForgotPasswordForm({ csrfToken }: any) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", isErr: false });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ isErr: false, text: "" });
    try {
      await axios.post("/api/users/forgot-password", {
        email,
      });

      setMessage({ isErr: false, text: "Password reset email sent." });
      setLoading(false);
    } catch (error: any) {
      setMessage({
        isErr: true,
        text:
          error?.response?.data?.message ??
          "Password reset can not  be processed at this moment!",
      });
      setLoading(false);
    }
  };

  return (
    <div className="my-3">
      {message.text && (
        <>
          {message.isErr ? (
            <p className="my-5 text-center text-red-500">❌ {message.text}</p>
          ) : (
            <p className="my-5 text-center text-green-700">🚀 {message.text}</p>
          )}
        </>
      )}
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
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
