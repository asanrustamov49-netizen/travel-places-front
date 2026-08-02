"use client"
import Detail from "@/components/pages/detail/Detail";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  console.log(params);
  return <Detail />;
};

export default page;
