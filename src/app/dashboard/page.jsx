"use client";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
    `api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );
  console.log(data);
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  return (
    <div>
      <div>
        {data?.map((item)=>(

        <div key={item.id}>
      <div>
        <Image src={item.img} alt=""/>
      </div>
      <h2>{item.title}</h2>
      <span><Trash /></span>
        </div>
        ))}
      </div>
      <form>
        <h1>Add New</h1>
        <input type="text" placeholder="Title"/>
        <input type="text" placeholder="Description"/>
        <input type="text" placeholder="Image" />
        <textarea placeholder="Content"></textarea>
        <button>Send</button>
      </form>
    </div>
  );
}
