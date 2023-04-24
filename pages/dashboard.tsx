import { NextPage } from "next";
import { supabase } from "@/lib/supabase";
import { Layout } from "@/component/Layout";
import { DocumentTextIcon, LogoutIcon } from "@heroicons/react/solid";
import { TaskForm } from "@/component/task/TaskForm";
import { TaskList } from "@/component/task/TaskList";

const Dashboard: NextPage = () => {
  // サインアウト処理
  const signOut = () => {
    supabase.auth.signOut();
  };
  return (
    <Layout title="Dashboard">
      {/* ログアウトボタン */}
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <div className="grid grid-cols-2 gap-40">
        {/* Task関連 */}
        <div>
          <div className="my-3 flex justify-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
          </div>
          <TaskForm />
          <TaskList />
        </div>
        {/* Notice関連 */}
      </div>
    </Layout>
  );
};

export default Dashboard;
