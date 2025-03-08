import Link from "next/link";
import { getAllCategories, getPostsByCategory } from "@/lib/api";

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">카테고리</h1>

      {categories.length === 0 ? (
        <p className="text-gray-600">아직 작성된 카테고리가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const posts = getPostsByCategory(category);

            return (
              <div
                key={category}
                className="bg-white rounded-lg shadow-sm p-6 transition-shadow hover:shadow-md"
              >
                <Link
                  href={`/categories/${category}`}
                  className="text-xl font-semibold text-primary hover:underline"
                >
                  {category}
                </Link>

                <p className="text-gray-600 mt-2">{posts.length}개의 포스트</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
