import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-sm max-md:px-4 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r dark:from-white dark:to-gray-500 from-gray-600 to-gray-300 bg-clip-text text-transparent">
        404 Not Found
      </h1>
      <div className="h-px w-80 rounded bg-gradient-to-r from-gray-400 to-gray-800 my-5 md:my-7"></div>
      <p className="md:text-xl text-gray-400 max-w-lg text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-10 rounded-full h-10 px-6">
        <Link href="/" className="flex items-center font-medium gap-2">
          <ArrowLeft />
          Back to Nexora
        </Link>
      </Button>
    </div>
  );
}
