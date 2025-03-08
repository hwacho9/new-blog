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

// 코드 블록 언어 이름을 표시하는 rehype 플러그인
function rehypeCodeLanguage() {
  return function (tree) {
    const visit = (node) => {
      if (
        node.tagName === "pre" &&
        node.children &&
        node.children[0] &&
        node.children[0].tagName === "code" &&
        node.children[0].properties &&
        node.children[0].properties.className &&
        node.children[0].properties.className[0] &&
        node.children[0].properties.className[0].startsWith("language-")
      ) {
        // 언어 이름 추출 (예: language-python -> python)
        const language = node.children[0].properties.className[0].replace(
          "language-",
          ""
        );

        // 코드 블록 컨테이너에 data-language 속성 추가
        node.properties["data-language"] = language;

        // 언어 라벨 요소 생성
        const langLabel = {
          type: "element",
          tagName: "div",
          properties: { className: ["code-language"] },
          children: [{ type: "text", value: language }],
        };

        // 원래 pre 컨테이너에 자식 요소로 추가
        const wrapper = {
          type: "element",
          tagName: "div",
          properties: { className: ["code-block-wrapper"] },
          children: [langLabel, node],
        };

        // 원래 노드를 래퍼로 대체
        return wrapper;
      }

      // 자식 노드들 순회
      if (node.children) {
        node.children = node.children.map(visit).filter(Boolean);
      }

      return node;
    };

    return visit(tree);
  };
}

export async function markdownToHtml(markdown: string) {
  try {
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

    try {
      const simpleResult = await remark().use(html).process(markdown);
      return simpleResult.toString();
    } catch {
      return markdown; // 오류 발생 시 원본 마크다운 텍스트 반환
    }
  }
}
