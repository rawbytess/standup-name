import { cn } from "@/lib/utils.ts";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className={cn("text-white py-6 w-full")}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold">Standup.Name</h1>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-gray-100 transition-colors"
          >
            <Github />
          </a>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Mufaddal Makati. All rights reserved.
      </div>
    </footer>
  );
}
