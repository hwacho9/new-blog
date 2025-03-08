import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

// 마크다운을 HTML로 변환하는 함수
export async function markdownToHtml(markdown: string) {
    try {
        // 유니파이드 파이프라인으로 마크다운 변환
        const result = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeSlug)
            .use(rehypeHighlight, {
                detect: true,
                ignoreMissing: true,
            })
            .use(rehypeStringify)
            .process(markdown);

        // 코드 블록 언어 표시를 위한 추가 처리
        const content = result.toString();
        const enhancedContent = content
            .replace(
                /<pre><code class="language-(\w+)">/g,
                '<div class="code-block-container"><div class="code-language">$1</div><pre><code class="language-$1">'
            )
            .replace(/<\/code><\/pre>/g, "</code></pre></div>");

        return enhancedContent;
    } catch (error) {
        console.error("Error converting markdown to HTML:", error);

        // 기본 변환 시도 (fallback)
        try {
            const simpleResult = await remark().use(html).process(markdown);
            return simpleResult.toString();
        } catch {
            return markdown; // 오류 발생 시 원본 마크다운 텍스트 반환
        }
    }
}
