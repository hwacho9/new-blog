import { getAllPosts, getPostsByTag } from "@/lib/api";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";

interface HomeProps {
    searchParams: Promise<{
        tag?: string;
    }>;
}

export default async function Home({ searchParams }: HomeProps) {
    // Next.js 15에서는 searchParams를 비동기적으로 처리해야 합니다
    const searchParamsData = await searchParams;
    const tag = searchParamsData.tag;

    const posts = tag ? getPostsByTag(tag) : getAllPosts();

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/4 space-y-8">
                <h1 className="text-3xl font-bold mb-8">
                    {tag ? `"${tag}" 태그의 포스트` : "최신 포스트"}
                </h1>

                {posts.length === 0 ? (
                    <p className="text-gray-600">
                        {tag
                            ? `"${tag}" 태그의 포스트가 없습니다.`
                            : "아직 작성된 포스트가 없습니다."}
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.slug} post={post} />
                        ))}
                    </div>
                )}
            </div>

            <div className="md:w-1/4">
                <Sidebar />
            </div>
        </div>
    );
}
