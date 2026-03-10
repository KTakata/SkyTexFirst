import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { fetchPlots, createPlot, updatePlot, deletePlot } from "../lib/plots";
import { PlotForm } from "./PlotForm";
import type { Plot, PlotInput } from "../types/plot";

type Props = {
  session: Session;
};

export function PlotList({ session }: Props) {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPlot, setEditingPlot] = useState<Plot | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setPlots(await fetchPlots());
    } catch (err) {
      setError(err instanceof Error ? err.message : "読み込みに失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (input: PlotInput) => {
    await createPlot(input);
    setShowForm(false);
    await load();
  };

  const handleUpdate = async (input: PlotInput) => {
    await updatePlot(editingPlot!.id, input);
    setEditingPlot(null);
    await load();
  };

  const handleDelete = async (plot: Plot) => {
    const confirmed = window.confirm(
      `「${plot.title}」を削除しますか？この操作は元に戻せません。`
    );
    if (!confirmed) return;
    try {
      await deletePlot(plot.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "削除に失敗しました。");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>SkyTex App</h1>
        <div style={styles.headerRight}>
          <span style={styles.email}>{session.user.email}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            ログアウト
          </button>
        </div>
      </header>

      <div style={styles.toolbar}>
        <h2 style={styles.sectionTitle}>プロット一覧</h2>
        <button onClick={() => setShowForm(true)} style={styles.createBtn}>
          ＋ 新規作成
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {loading ? (
        <p style={styles.muted}>読み込み中...</p>
      ) : plots.length === 0 ? (
        <p style={styles.muted}>プロットがまだありません。「新規作成」から追加してください。</p>
      ) : (
        <div style={styles.grid}>
          {plots.map((plot) => (
            <div key={plot.id} style={styles.card}>
              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{plot.title}</h3>
                <p style={styles.cardSynopsis}>
                  {plot.synopsis ? plot.synopsis.slice(0, 80) + (plot.synopsis.length > 80 ? "…" : "") : "（あらすじなし）"}
                </p>
              </div>
              <div style={styles.cardFooter}>
                <span style={styles.cardDate}>
                  更新: {new Date(plot.updated_at).toLocaleDateString("ja-JP")}
                </span>
                <div style={styles.cardActions}>
                  <button onClick={() => setEditingPlot(plot)} style={styles.editBtn}>
                    編集
                  </button>
                  <button onClick={() => handleDelete(plot)} style={styles.deleteBtn}>
                    削除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <PlotForm onSave={handleCreate} onCancel={() => setShowForm(false)} />
      )}

      {editingPlot && (
        <PlotForm
          initial={editingPlot}
          onSave={handleUpdate}
          onCancel={() => setEditingPlot(null)}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "24px 16px",
    textAlign: "left",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #333",
    paddingBottom: "16px",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px",
  },
  title: {
    margin: 0,
    fontSize: "1.6em",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  email: {
    fontSize: "0.85em",
    color: "rgba(255,255,255,0.5)",
  },
  logoutBtn: {
    fontSize: "0.85em",
    padding: "6px 14px",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.1em",
    fontWeight: 600,
  },
  createBtn: {
    background: "#646cff",
    border: "1px solid transparent",
    color: "#fff",
    padding: "8px 18px",
  },
  error: {
    color: "#f87171",
    marginBottom: "16px",
  },
  muted: {
    color: "rgba(255,255,255,0.45)",
    textAlign: "center",
    marginTop: "48px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px",
  },
  card: {
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
    gap: "12px",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.05em",
    fontWeight: 600,
  },
  cardSynopsis: {
    margin: 0,
    fontSize: "0.88em",
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.6,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid #2e2e2e",
    paddingTop: "12px",
  },
  cardDate: {
    fontSize: "0.78em",
    color: "rgba(255,255,255,0.35)",
  },
  cardActions: {
    display: "flex",
    gap: "8px",
  },
  editBtn: {
    fontSize: "0.82em",
    padding: "4px 12px",
  },
  deleteBtn: {
    fontSize: "0.82em",
    padding: "4px 12px",
    color: "#f87171",
    border: "1px solid #f87171",
    background: "transparent",
  },
};
