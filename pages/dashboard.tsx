import { NextPage } from "next";
import { supabase } from "@/lib/supabase";
import { Layout } from "@/component/Layout";
import {
  DocumentTextIcon,
  LogoutIcon,
  StatusOnlineIcon,
} from "@heroicons/react/solid";
import { TaskForm } from "@/component/task/TaskForm";
import { TaskList } from "@/component/task/TaskList";
import { NoticeForm } from "@/component/notice/NoticeForm";
import { NoticeList } from "@/component/notice/NoticeList";
import { useQueryClient } from "react-query";

const Dashboard: NextPage = () => {
  const queryClient = useQueryClient();

  // サインアウト処理
  const signOut = () => {
    supabase.auth.signOut();
    // キャッシュの削除
    queryClient.removeQueries("todos");
    queryClient.removeQueries("notices");
  };
  return (
    <Layout title="Dashboard">
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
        <div>
          <div className="my-3 flex justify-center">
            <StatusOnlineIcon className="h-8 w-8 text-blue-500" />
          </div>
          <NoticeForm />
          <NoticeList />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
