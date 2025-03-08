import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsByCategory } from "@/lib/api";
import PostCard from "@/components/PostCard";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  // 카테고리 목록을 하드코딩하여 오류 방지
  return [
    { category: "일상" },
    { category: "프로그래밍" },
    { category: "여행" },
  ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const paramsData = await params;
    const category = paramsData.category;
    const decodedCategory = decodeURIComponent(category);
    const posts = getPostsByCategory(decodedCategory);

    if (posts.length === 0) {
      notFound();
    }

    return (
      <div>
        <div className="mb-8">
          <Link href="/categories" className="text-primary hover:underline">
            ← 모든 카테고리
          </Link>
          <h1 className="text-3xl font-bold mt-4">
            카테고리: {decodedCategory}
          </h1>
          <p className="text-gray-600 mt-2">{posts.length}개의 포스트</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering category page:", error);
    notFound();
  }
}
