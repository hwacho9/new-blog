import { redirect } from "next/navigation";

interface TagPageProps {
    params: Promise<{
        tag: string;
    }>;
}

export default async function TagPage({ params }: TagPageProps) {
    const paramsData = await params;
    const tag = paramsData.tag;
    redirect(`/?tag=${tag}`);
}
