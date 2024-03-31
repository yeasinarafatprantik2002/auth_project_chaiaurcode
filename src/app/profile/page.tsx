"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState();

  const userDetail = async () => {
    try {
      const response = await axios.post("/api/users/me/");
      console.log(response.data.user._id);
      setData(response.data.user._id);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout/");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-4xl">Profile page</h1>
      <h2>
        {data === undefined ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />

      <button
        className=" m-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={userDetail}>
        Get user details
      </button>
      <button
        className=" m-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
