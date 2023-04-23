import { useState } from "react";
import { useMutation } from "react-query";
import { supabase } from "@/lib/supabase";

// 認証処理に使用するカスタムフック
export const useMutateAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // フォームのリセット
  const reset = () => {
    setEmail("");
    setPassword("");
  };

  // ログイン処理
  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) {
        throw new Error(error.message);
      }
    },
    {
      // ログイン失敗時の処理
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  // サインアップ処理
  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw new Error(error.message);
      }
    },
    {
      // 登録失敗時の処理
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  };
};
