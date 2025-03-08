import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { markdownToHtml } from "@/lib/markdown";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    // 정적 경로 생성은 서버에서 실행되므로 여기서는 경로만 반환
    return [
      { slug: "hello-world" },
      { slug: "programming-tips" },
      { slug: "travel-memories" },
    ];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const paramsData = await params;
  const slug = paramsData.slug;

  try {
    const post = getPostBySlug(slug);

    if (!post) {
      notFound();
    }

    const contentHtml = await markdownToHtml(post.content);

    return (
      <article className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-primary hover:underline mb-8 inline-block"
        >
          ← 홈으로 돌아가기
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>

          <div className="flex items-center text-sm text-gray-600 mb-4">
            <time dateTime={post.date} className="mr-4">
              작성일: {formatDate(post.date)}
            </time>

            {post.updatedAt && post.updatedAt !== post.date && (
              <time dateTime={post.updatedAt} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
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
                수정일: {formatDate(post.updatedAt)}
              </time>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Link
              href={`/categories/${post.category}`}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            >
              {post.category}
            </Link>

            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/?tag=${tag}`}
                className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {post.coverImage && (
          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-blue prose-lg max-w-none mb-8 prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    );
  } catch (error) {
    console.error("Error rendering post:", error);
    notFound();
  }
}
