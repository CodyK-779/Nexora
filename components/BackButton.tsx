"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="font-medium max-[350px]:small-btn"
    >
      <ArrowLeftIcon /> Go Back
    </Button>
  );
};

export default BackButton;
