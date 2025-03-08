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

/**
 * 마크다운 텍스트를 HTML로 변환하는 함수
 * @param markdown 변환할 마크다운 텍스트
 * @returns 변환된 HTML 문자열
 */
export async function markdownToHtml(markdown: string): Promise<string> {
    try {
        // 유니파이드 파이프라인으로 마크다운 변환
        const result = await unified()
            .use(remarkParse)
            .use(remarkGfm) // GitHub Flavored Markdown 지원
            .use(remarkRehype, { allowDangerousHtml: true }) // HTML 태그 허용
            .use(rehypeRaw) // 원본 HTML 보존
            .use(rehypeSlug) // 헤딩에 ID 추가
            .use(rehypeHighlight, {
                // 코드 블록 구문 강조
                detect: true,
                ignoreMissing: true,
            })
            .use(rehypeStringify) // HTML 문자열로 변환
            .process(markdown);

        // 코드 블록에 언어 표시 추가
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
            // 모든 변환이 실패하면 원본 텍스트 반환
            return markdown;
        }
    }
}
