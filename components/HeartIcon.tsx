"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";

const HeartIcon = () => {
  return (
    <Button size="icon" variant="ghost" onClick={() => console.log("Hearted")}>
      <Heart className="w-5 h-5 text-gray-500 hover:text-red-500 transition-colors" />
    </Button>
  );
};

export default HeartIcon;
