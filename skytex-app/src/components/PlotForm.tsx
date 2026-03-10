import { useState } from "react";
import type { Plot, PlotInput } from "../types/plot";

type Props = {
  initial?: Plot;
  onSave: (input: PlotInput) => Promise<void>;
  onCancel: () => void;
};

export function PlotForm({ initial, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [synopsis, setSynopsis] = useState(initial?.synopsis ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("タイトルは必須です。");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave({ title: title.trim(), synopsis: synopsis.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました。");
      setSaving(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>{initial ? "プロット編集" : "新規プロット作成"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            タイトル
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="プロットのタイトル"
              style={styles.input}
              autoFocus
            />
          </label>

          <label style={styles.label}>
            あらすじ
            <textarea
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="あらすじを入力してください"
              rows={8}
              style={styles.textarea}
            />
          </label>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.actions}>
            <button type="button" onClick={onCancel} style={styles.cancelBtn} disabled={saving}>
              キャンセル
            </button>
            <button type="submit" style={styles.saveBtn} disabled={saving}>
              {saving ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "16px",
  },
  modal: {
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "12px",
    padding: "32px",
    width: "100%",
    maxWidth: "560px",
    boxSizing: "border-box",
  },
  heading: {
    margin: "0 0 24px",
    fontSize: "1.4em",
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "0.9em",
    color: "rgba(255,255,255,0.7)",
    textAlign: "left",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#242424",
    color: "inherit",
    fontSize: "1em",
    fontFamily: "inherit",
  },
  textarea: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#242424",
    color: "inherit",
    fontSize: "1em",
    fontFamily: "inherit",
    resize: "vertical",
  },
  error: {
    color: "#f87171",
    margin: 0,
    fontSize: "0.9em",
  },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "8px",
  },
  cancelBtn: {
    background: "transparent",
    border: "1px solid #555",
    color: "rgba(255,255,255,0.7)",
  },
  saveBtn: {
    background: "#646cff",
    border: "1px solid transparent",
    color: "#fff",
  },
};
