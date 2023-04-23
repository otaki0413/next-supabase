import type { AppProps, NextWebVitalsMetric } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "@/lib/tailwind.css";

// メトリックに応じて、webvitalを計測する処理
export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case "FCP":
      console.log(`FCP: ${Math.round(metric.value * 10) / 10}`);
      break;
    case "LCP":
      console.log(`LCP: ${Math.round(metric.value * 10) / 10}`);
      break;
    case "TTFB":
      console.log(`TTFB: ${Math.round(metric.value * 10) / 10}`);
      break;
    case "Next.js-hydration":
      console.log(
        `Hydration: ${Math.round(metric.startTime * 10) / 10} -> ${
          Math.round((metric.startTime + metric.value) * 10) / 10
        }`
      );
      break;
    default:
      break;
  }
}

// --------------------
// ReactQueryクライアント作成
// --------------------
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter();
  console.log(pathname);

  // ユーザーの存在とパスチェックによるバリデーション
  const validateSession = async () => {
    // ログインユーザー取得
    const user = supabase.auth.user();
    if (user && pathname === "/") {
      push("/dashboard");
    } else if (!user && pathname !== "/") {
      push("/");
    }
  };

  // 認証ステータスに応じた画面遷移
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === "SIGNED_IN" && pathname === "/") {
      console.log(event);
      push("/dashboard");
    }
    if (event === "SIGNED_OUT") {
      console.log(event);
      push("/");
    }
  });

  // 初回マウント時
  useEffect(() => {
    // バリデーション処理実行
    validateSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
