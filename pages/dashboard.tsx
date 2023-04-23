import { NextPage } from "next";
import { supabase } from "@/lib/supabase";
import { Layout } from "@/component/Layout";
import { LogoutIcon } from "@heroicons/react/solid";

const Dashboard: NextPage = () => {
  // サインアウト処理
  const signOut = () => {
    supabase.auth.signOut();
  };
  return (
    <Layout title="Dashboard">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
    </Layout>
  );
};

export default Dashboard;
