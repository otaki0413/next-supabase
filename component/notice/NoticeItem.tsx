import { FC, useEffect, useState } from "react";
import useStore from "@/store";
import { useMutateNotice } from "@/hooks/useMutateNotices";
import { Notice } from "@/types/types";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { supabase } from "@/lib/supabase";

export const NoticeItem: FC<Omit<Notice, "created_at">> = ({
  id,
  content,
  user_id,
}) => {
  const [userId, setUserId] = useState<string | undefined>("");
  // Noticeの更新関数
  const update = useStore((state) => state.updateEditedNotice);
  // Noticeの削除用ミューテーション
  const { deleteNoticeMutation } = useMutateNotice();
  // 初回マウント時の処理
  useEffect(() => {
    setUserId(supabase.auth.user()?.id);
  }, []);

  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{content}</span>
      {userId === user_id ? (
        <div className="float-right ml-20 flex">
          <PencilAltIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({ id: id, content: content });
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteNoticeMutation.mutate(id);
            }}
          />
        </div>
      ) : null}
    </li>
  );
};
