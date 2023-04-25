import { useMutation, useQueryClient } from "react-query";
import useStore from "@/store";
import { supabase } from "@/lib/supabase";
import { Task, EditedTask } from "./../types/types";

// タスク関連のMutationカスタムフック
export const useMutateTask = () => {
  // クライアント接続
  const queryClient = useQueryClient();
  const reset = useStore((state) => state.resetEditedTask);

  // タスク作成用のMutation
  const createTaskMutation = useMutation(
    async (task: Omit<Task, "id" | "created_at">) => {
      const { data, error } = await supabase.from("todos").insert(task);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      // 成功時
      onSuccess: (res) => {
        // キャッシュの更新
        const prevTodos = queryClient.getQueryData<Task[]>(["todos"]);
        if (prevTodos) {
          queryClient.setQueryData(["todos"], [...prevTodos, res[0]]);
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

  // タスク更新用のMutation
  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const { data, error } = await supabase
        .from("todos")
        .update({ title: task.title })
        .eq("id", task.id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      // 成功時
      onSuccess: (res, variables) => {
        // キャッシュの更新処理
        const prevTodos = queryClient.getQueryData<Task[]>(["todos"]);
        if (prevTodos) {
          queryClient.setQueryData(
            ["todos"],
            prevTodos.map((task) => (task.id === variables.id ? res[0] : task))
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

  // タスク削除用のMutation
  const deleteTaskMutation = useMutation(
    async (id: string) => {
      // IDに一致するタスクを削除
      const { data, error } = await supabase
        .from("todos")
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
        const prevTodos = queryClient.getQueryData<Task[]>(["todos"]);
        if (prevTodos) {
          queryClient.setQueriesData(
            ["todos"],
            prevTodos.filter((task) => task.id !== variables)
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

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
