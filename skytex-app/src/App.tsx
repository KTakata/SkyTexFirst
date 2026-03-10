import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import { PlotList } from "./components/PlotList";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignUp = async () => {
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`新規登録エラー: ${error.message}`);
      return;
    }

    setMessage("新規登録しました。メール確認が必要な場合は受信箱をご確認ください。");
  };

  const handleLogin = async () => {
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`ログインエラー: ${error.message}`);
      return;
    }

    setMessage("ログインしました。");
  };

  if (session) {
    return <PlotList session={session} />;
  }

  return (
    <div style={{ padding: "24px", maxWidth: "480px", margin: "0 auto" }}>
      <h1>SkyTex App</h1>
      <p>ログイン / 新規登録</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>ログイン</button>
        <button onClick={handleSignUp}>新規登録</button>
      </div>

      {message && <p style={{ marginTop: "16px" }}>{message}</p>}
    </div>
  );
}

export default App;
