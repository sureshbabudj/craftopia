"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function ResetPasswordForm({
  email,
  callback,
}: {
  email: string;
  callback?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", isErr: false });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (message.isErr) {
      return;
    }
    setLoading(true);
    setMessage({ isErr: false, text: "" });
    try {
      await axios.post("/api/users/reset-password", {
        email,
        password,
      });

      setMessage({ isErr: false, text: "The Password has been reset." });
      setLoading(false);
      callback?.();
    } catch (error: any) {
      setMessage({
        isErr: true,
        text:
          error?.response?.data?.message ??
          "Password reset can not be processed at this moment!",
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
            onChange={(e) => {
              e.target.value !== confirmPassword
                ? setMessage({ isErr: true, text: "passwords do not match" })
                : setMessage({ isErr: false, text: "" });
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => {
              e.target.value !== password
                ? setMessage({ isErr: true, text: "passwords do not match" })
                : setMessage({ isErr: false, text: "" });
              setConfirmPassword(e.target.value);
            }}
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
