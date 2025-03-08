import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function TagsPage() {
  const tags = getAllTags();

  // 태그별 포스트 개수에 따라 크기를 다르게 표시
  const getTagSize = (tagCount: number) => {
    if (tagCount >= 10) return "text-xl font-semibold";
    if (tagCount >= 5) return "text-lg font-medium";
    return "text-base";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">태그</h1>

      {tags.length === 0 ? (
        <p className="text-gray-600">아직 작성된 태그가 없습니다.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => {
              const posts = getPostsByTag(tag);

              return (
                <Link
                  key={tag}
                  href={`/?tag=${tag}`}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                    "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:text-primary",
                    getTagSize(posts.length)
                  )}
                >
                  #{tag}
                  <span className="text-xs text-gray-500 ml-1">
                    ({posts.length})
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
