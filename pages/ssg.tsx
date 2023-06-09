import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Layout } from "@/component/Layout";
import { Notice, Task } from "@/types/types";

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
  const router = useRouter();
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
      {/* 画面遷移用のリンク */}
      <Link href="/ssr" prefetch={false}>
        <a className="my-3 text-xs"> Link to ssr </a>
      </Link>
      <Link href="/isr" prefetch={false}>
        <a className="mb-3 text-xs"> Link to isr </a>
      </Link>
      {/* 画面遷移用のボタン */}
      <button
        className="mb-3 bg-red-200 text-xs"
        onClick={() => router.push("/ssr")}
      >
        Route to ssr
      </button>
      <button className="mb-3 text-xs" onClick={() => router.push("/isr")}>
        Route to isr
      </button>
    </Layout>
  );
};

export default Ssg;
