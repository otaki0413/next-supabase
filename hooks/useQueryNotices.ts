import { useQuery } from "react-query";
import { supabase } from "@/lib/supabase";
import { Notice } from "@/types/types";

// DBからNoticeを取得する用のカスタムフック
export const useQueryNotices = () => {
  const getNotices = async () => {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  return useQuery<Notice[], Error>({
    queryKey: ["notices"], // DB取得データをキャッシュする際にキー名指定
    queryFn: getNotices,
    staleTime: 0, // [ms]
    refetchOnWindowFocus: true, // 最新データを再フェッチ
  });
};
