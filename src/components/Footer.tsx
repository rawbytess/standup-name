import { cn } from "@/lib/utils.ts";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-black w-full">
      <footer className={cn("text-white max-w-[60em] mx-auto py-6")}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex flex-col items-center">
            <a
              href={"https://www.linkedin.com/in/prenx4x/"}
              target="_blank"
              rel="noopener noreferrer"
              className={"mr-2 text-gray-100 hover:text-blue-300"}
            >
              Mufaddal Makati
            </a>
            <span className={"text-xs"}>
              © {new Date().getFullYear()}. All rights reserved.
            </span>
          </div>
          <div className="text-center text-md text-gray-100">
            <p className="text-md font-bold">Also checkout</p>
            <a
              href={"https://hissab.io"}
              target={"_blank"}
              className={"mr-2 text-gray-100 hover:text-blue-300"}
            >
              Hissab - A powerful natural language calculator
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/rawbytess/standup-name"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-gray-100 hover:bg-gray-600 bg-gray-800 rounded-full p-2 transition-colors"
            >
              <Github />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
