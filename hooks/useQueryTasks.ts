import { useQuery } from "react-query";
import { supabase } from "@/lib/supabase";
import { Task } from "@/types/types";

// DBからTaskを取得する用のカスタムフック
export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  return useQuery<Task[], Error>({
    queryKey: ["todos"], // DB取得データをキャッシュする際にキー名指定
    queryFn: getTasks,
    staleTime: Infinity, // キャッシュを最新状態として保持する期間
  });
};
