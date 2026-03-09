# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# SkyTex App

React + TypeScript + Vite + Supabase を使用したWebアプリケーションのベースプロジェクトです。

このリポジトリは、チームメンバーが clone してすぐ開発を開始できるようにするための **プロジェクトテンプレート** です。

---

# 技術スタック

* React
* TypeScript
* Vite
* Supabase
* Node.js

---

# 前提環境

以下のツールがインストールされている必要があります。

* Node.js 20.x
* npm

Node バージョン確認

```
node -v
npm -v
```

---

# セットアップ

リポジトリを clone します。

```
git clone <repository-url>
cd skytex-app
```

依存パッケージをインストールします。

```
npm install
```

---

# 環境変数設定

`.env.example` をコピーして `.env` を作成してください。

```
cp .env.example .env
```

`.env` に Supabase の接続情報を設定します。

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_publishable_key
```

Supabase の API Key は以下から取得できます。

Supabase Dashboard
Project Settings → API Keys

---

# 開発サーバー起動

```
npm run dev
```

ブラウザで以下を開きます。

```
http://localhost:5173
```

---

# フォルダ構成

```
skytex-app
├ src
│  ├ components
│  ├ pages
│  ├ lib
│  │   └ supabase.ts
│  ├ App.tsx
│  └ main.tsx
├ public
├ .env.example
├ package.json
├ tsconfig.json
└ vite.config.ts
```

---

# Supabase

Supabase は以下の用途で使用します。

* 認証（Auth）
* データベース（PostgreSQL）
* Storage
* API

クライアント接続は以下のファイルで管理します。

```
src/lib/supabase.ts
```

---

# Git運用

基本的な開発フロー

```
git pull
git checkout -b feature/xxxx
git commit
git push
```

---

# 注意事項

以下のファイルは Git 管理対象外です。

```
.env
node_modules
dist
```

`.env` には秘密情報が含まれるため、絶対にコミットしないでください。

---

# 今後の開発予定

* Supabase Auth 実装
* プロフィール管理
* CRUD API
* UIコンポーネント整備

---

# ライセンス

Private Repository
