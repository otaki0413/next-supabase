import { FC } from "react";
import { TaskItem } from "@/component/task/TaskItem";
import { useQueryTasks } from "@/hooks/useQueryTasks";
import { Spinner } from "@/component/Spinner";

export const TaskList: FC = () => {
  // タスク取得用のカスタムフック実行
  const { data: tasks, status } = useQueryTasks();
  // ローディング時
  if (status === "loading") return <Spinner />;
  // エラー時
  if (status === "error") return <p>{"Error"}</p>;

  return (
    <ul className="my-2">
      {tasks?.map((task) => (
        <TaskItem key={task?.id} id={task?.id} title={task?.title} />
      ))}
    </ul>
  );
};
