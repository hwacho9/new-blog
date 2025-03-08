"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { PostType } from "@/types";

interface PostCardProps {
  post: PostType;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      {post.coverImage && (
        <div className="relative aspect-video w-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          <Link
            href={`/categories/${post.category}`}
            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
          >
            {post.category}
          </Link>

          {post.tags.slice(0, 2).map((tag) => (
            <Link
              key={tag}
              href={`/?tag=${tag}`}
              className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
            >
              #{tag}
            </Link>
          ))}

          {post.tags.length > 2 && (
            <span className="text-xs text-gray-500">
              +{post.tags.length - 2}
            </span>
          )}
        </div>

        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>

          {post.updatedAt && post.updatedAt !== post.date && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <time dateTime={post.updatedAt}>
                {formatDate(post.updatedAt)}
              </time>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
