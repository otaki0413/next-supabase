import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Layout } from "@/component/Layout";
import { supabase } from "@/lib/supabase";
import { Notice, Task } from "@/types/types";

const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  // 初回レンダリング時に実行
  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });
      setTasks(tasks as Task[]);
    };
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: true });
      setNotices(notices as Notice[]);
    };
    getTasks();
    getNotices();
  }, []);

  return (
    <Layout title="CSR">
      <p className="mb-3 text-blue-500">SSG + CSF</p>
      {/* Task */}
      <ul className="mb-3">
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className="text-lg font-extrabold">{task.title}</p>
            </li>
          );
        })}
      </ul>

      {/* Notice */}
      <ul className="mb-3">
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className="text-lg font-extrabold">{notice.content}</p>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Csr;
