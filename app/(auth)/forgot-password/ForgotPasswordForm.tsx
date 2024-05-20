"use client";
import axios from "axios";
import { useState } from "react";

export function ForgotPasswordForm({ csrfToken }: any) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("/api/users/forgot-password", {
        email,
      });

      setMessage("Password reset email sent.");
    } catch (error) {
      setMessage("Password reset can not  be process at this moment!");
    }
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
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
