import { FC } from "react";
import { NoticeItem } from "@/component/notice/NoticeItem";
import { useQueryNotices } from "@/hooks/useQueryNotices";
import { Spinner } from "@/component/Spinner";

export const NoticeList: FC = () => {
  // タスク取得用のカスタムフック実行
  const { data: notices, status } = useQueryNotices();
  // ローディング時
  if (status === "loading") return <Spinner />;
  // エラー時
  if (status === "error") return <p>{"Error"}</p>;

  return (
    <ul className="my-2">
      {notices?.map((notice) => (
        <NoticeItem
          key={notice?.id}
          id={notice?.id}
          content={notice?.content}
          user_id={notice?.user_id}
        />
      ))}
    </ul>
  );
};
