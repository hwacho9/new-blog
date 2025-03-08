export interface PostType {
  slug: string;
  title: string;
  date: string;
  updatedAt?: string;
  excerpt: string;
  coverImage?: string;
  content: string;
  category: string;
  tags: string[];
}
