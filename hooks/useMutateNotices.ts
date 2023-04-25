import { useMutation, useQueryClient } from "react-query";
import useStore from "@/store";
import { supabase } from "@/lib/supabase";
import { Notice, EditedNotice } from "./../types/types";

// Notice関連のMutationカスタムフック
export const useMutateNotice = () => {
  // クライアント接続
  const queryClient = useQueryClient();
  const reset = useStore((state) => state.resetEditedNotice);

  // Notice作成用のMutation
  const createNoticeMutation = useMutation(
    async (notice: Omit<Notice, "id" | "created_at">) => {
      const { data, error } = await supabase.from("notices").insert(notice);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      // 成功時
      onSuccess: (res) => {
        // キャッシュの更新
        const prevNotices = queryClient.getQueryData<Notice[]>(["notices"]);
        if (prevNotices) {
          queryClient.setQueryData(["notices"], [...prevNotices, res[0]]);
        }
        reset();
      },
      // 失敗時
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  // Notice更新用のMutation
  const updateNoticeMutation = useMutation(
    async (notice: EditedNotice) => {
      const { data, error } = await supabase
        .from("notices")
        .update({ content: notice.content })
        .eq("id", notice.id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      // 成功時
      onSuccess: (res, variables) => {
        // キャッシュの更新
        const prevNotices = queryClient.getQueryData<Notice[]>(["notices"]);
        if (prevNotices) {
          // 既存の
          queryClient.setQueryData(
            ["notices"],
            prevNotices.map((notice) => {
              notice.id === variables.id ? res[0] : notice;
            })
          );
        }
        reset();
      },
      // 失敗時
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  // Notice削除用のMutation
  const deleteNoticeMutation = useMutation(
    async (id: string) => {
      // IDに一致するNoticeを削除
      const { data, error } = await supabase
        .from("notices")
        .delete()
        .eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      // 成功時
      onSuccess: (_, variables) => {
        const prevNotices = queryClient.getQueryData<Notice[]>(["notices"]);
        if (prevNotices) {
          queryClient.setQueriesData(
            ["notices"],
            prevNotices.filter((notice) => notice.id !== variables)
          );
        }
      },
      // 失敗時
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  return { createNoticeMutation, updateNoticeMutation, deleteNoticeMutation };
};
