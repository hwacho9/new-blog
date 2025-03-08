// 이 파일의 함수들은 서버에서만 사용해야 합니다
// Next.js에서는 서버 컴포넌트나 API 라우트, getStaticProps 등 서버 영역에서만 가능합니다

import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { PostType } from "../types";

const postsDirectory = join(process.cwd(), "src/content/blog");

// Server-only functions
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): PostType {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    updatedAt: data.updatedAt,
    excerpt: data.excerpt || "",
    coverImage: data.coverImage || "",
    content,
    category: data.category || "Uncategorized",
    tags: data.tags || [],
  };
}

export function getAllPosts(): PostType[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPostsByCategory(category: string): PostType[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): PostType[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categoriesSet = new Set(posts.map((post) => post.category));
  return Array.from(categoriesSet);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet);
}
