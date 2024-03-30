"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      toast.success("Login successful");
      router.push("/profile");
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-4xl">{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email" className="text-xl mt-2">
        Email:
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black text-xl"
        id="email"
        value={user.email}
        onChange={(e: any) => setUser({ ...user, email: e.target.value })}
        type="email"
        placeholder="email"
      />
      <label htmlFor="passwod" className="text-xl mt-2">
        Password:
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black text-xl"
        id="password"
        value={user.password}
        onChange={(e: any) => setUser({ ...user, password: e.target.value })}
        type="password"
        placeholder="password"
      />
      <button
        disabled={buttonDisabled}
        onClick={handleSubmit}
        className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        {" "}
        {loading ? "Processing" : "Signup"}
      </button>
      <Link href={"/signup"}>Do not have account? Signup</Link>
    </div>
  );
}

export default LoginPage;
