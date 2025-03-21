"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/GHXhZDO4KL4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useSharedTransition } from "@/lib/hooks/use-shared-transition";

export function SearchBox({ query }: { query?: string }) {
  const q = query || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(q.length >= 3);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { startTransition, isPending: disabled } = useSharedTransition();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    startTransition &&
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
  }, 300);

  const resetQuery = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    handleSearch("");
  };

  return (
    <div className="w-full mb-4">
      <div className="relative flex items-center justify-center">
        <div className="relative w-full max-w-2xl mx-auto">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 text-[#34d399]" />
          <Input
            disabled={disabled}
            ref={inputRef}
            defaultValue={query ?? ""}
            minLength={3}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue.length > 2) {
                setIsValid(true);
                handleSearch(newValue);
              } else if (newValue.length === 0) {
                handleSearch(newValue);
                setIsValid(false);
              } else {
                setIsValid(false);
              }
            }}
            className="text-2xl w-full pl-16 pr-16 py-10 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-[#34d399]"
            placeholder="Search for memes..."
          />
          {q.length > 0 ? (
            <Button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rounded-full h-14 w-14"
              variant="ghost"
              type="reset"
              size={"icon"}
              onClick={resetQuery}
            >
              <X height="36" width="36" />
            </Button>
          ) : null}
        </div>
      </div>
      {!isValid && q.length > 0 ? (
        <div className="text-base pt-2 text-center text-[#34d399]">
          Query must be 3 characters or longer
        </div>
      ) : (
        <div className="h-8" />
      )}
    </div>
  );
}
