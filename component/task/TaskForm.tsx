import { FC, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useMutateTask } from "@/hooks/useMutateTask";
import useStore from "@/store";

export const TaskForm: FC = () => {
  const { editedTask } = useStore();
  const update = useStore((state) => state.updateEditedTask);
  const { createTaskMutation, updateTaskMutation } = useMutateTask();

  // subumit機能
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedTask.id === "") {
      // タスクの新規作成
      createTaskMutation.mutate({
        title: editedTask.title,
        user_id: supabase.auth.user()?.id,
      });
    } else {
      // タスクの更新
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
      });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="New task ?"
        value={editedTask.title}
        onChange={(e) => update({ ...editedTask, title: e.target.value })}
      />
      <button
        type="submit"
        className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        {editedTask.id ? "Update" : "Create"}
      </button>
    </form>
  );
};
