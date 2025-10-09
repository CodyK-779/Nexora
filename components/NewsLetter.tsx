"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSub = () => {
    if (!email.trim()) {
      return toast.error("Your email is empty");
    }

    setEmail("");
    toast.success("Email subscribed successfully!");
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Mail className="sm:size-12 size-10 mx-auto mb-4" />
        <h2 className="sm:text-3xl text-2xl font-semibold mb-2">
          Our Newsletter
        </h2>
        <p className="sm:text-base text-sm text-blue-100 mb-8 max-w-2xl mx-auto">
          Get the latest updates on new products, exclusive deals, and special
          offers delivered to your inbox.
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sm:py-5 max-[500px]:placeholder:text-sm bg-white text-gray-900"
          />
          <Button
            className="sm:py-5 bg-neutral-950 text-white dark:hover:bg-neutral-900"
            onClick={handleSub}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
