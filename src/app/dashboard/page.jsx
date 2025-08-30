"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

export default function DashboardPage() {
  // const [data,setData]=useState([]);
  // const [err,setErr]=useState(false);
  // const [isloading,setLoading]=useState(false);

  // useEffect(()=>{
  // const getData=async()=> {
  //   setLoading(true);
  //   const fetchData = await fetch(
  //     `https://jsonplaceholder.typicode.com/posts`,
  //     {
  //       cache: "no-cache",
  //     }
  //   );
  //   if (!fetchData.ok) {
  //     setErr(true);
  //   }
  //   setLoading(false);
  //   const res=await fetchData.json();
  //   setData(res);
  // }
  // getData();
  // },[])
  const session = useSession();
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}
