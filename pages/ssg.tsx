import { GetStaticProps, NextPage } from "next";
import { supabase } from "../lib/supabase";
import { Notice, Task } from "@/types/types";
import { Layout } from "@/component/Layout";

export const getStaticProps: GetStaticProps = async () => {
  console.log("getStaticProps/ssg invoked");
  const { data: tasks } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: true });

  return { props: { tasks, notices } };
};

type StaticProps = {
  tasks: Task[];
  notices: Notice[];
};

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
  return (
    <Layout title="SSG">
      <p className="mb-3 text-blue-300">SSG</p>
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

export default Ssg;
