import { cn } from "@/lib/utils.ts";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-black max-w-[50em] mx-auto">
      <footer className={cn("text-white py-6 w-full")}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl font-bold">Standup.Name</h1>
          </div>
          <div className="text-center text-md text-gray-100">
            <span className={"mr-2"}>Mufaddal Makati</span>
            <br />
            <span>© {new Date().getFullYear()}. All rights reserved.</span>
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
