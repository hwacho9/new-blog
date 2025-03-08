"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface TagButtonProps {
  tag: string;
  count?: number;
}

const TagButton = ({ tag, count }: TagButtonProps) => {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");
  const isActive = selectedTag === tag;

  return (
    <Link
      href={isActive ? "/" : `/?tag=${tag}`}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
        isActive
          ? "bg-black text-white border-black"
          : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
      )}
    >
      {tag}
      {count !== undefined && (
        <span className="ml-1 text-xs opacity-70">({count})</span>
      )}
    </Link>
  );
};

export default TagButton;
