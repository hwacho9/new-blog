import { getAllTags, getPostsByTag } from "@/lib/api";
import TagButton from "./TagButton";

export interface TagData {
  name: string;
  count: number;
}

const Sidebar = () => {
  // 서버에서 태그 데이터 가져오기
  const allTags = getAllTags();
  const tagData: TagData[] = allTags.map((tag) => ({
    name: tag,
    count: getPostsByTag(tag).length,
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-lg font-bold mb-6 text-gray-800">태그로 찾아보기</h2>
      <div className="flex flex-wrap gap-2">
        {tagData.map((tag) => (
          <TagButton key={tag.name} tag={tag.name} count={tag.count} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
