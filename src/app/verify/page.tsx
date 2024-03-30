/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const VerifyPage = () => {
  const query = useSearchParams();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verify", { token });
      setVerified(true);
      setError(false);
      toast.success("Email verified");
    } catch (error: any) {
      console.error(error);
      setError(true);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = query.get("token");

    setToken((urlToken as string) || "");
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyEmail();
      //   setError(false);
    }
  }, [token]);

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-4xl">Verify Email</h1>
      <hr />
      <h2 className=" p-2 bg-orange-500 text-black">
        {token.length > 0 ? `${token}` : "No token"} {}
      </h2>
      {verified && (
        <div>
          <h1>Email Verified</h1>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h1>Email varification error</h1>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
