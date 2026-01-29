# Prompt Generator 🚀

**Prompt Generator** は、ChatGPTやGeminiなどのLLM（大規模言語モデル）の能力を最大限に引き出すための「メタプロンプト」を作成するWebアプリケーションです。

専門的なプロンプトエンジニアリングの知識がなくても、目的に応じた項目（`promptConfig.ts`で定義）を埋めるだけで、高品質なシステムプロンプトを生成できます。Vibe Codingの原則に基づいた「高速実装モード」や、**CO-STAR / CRISPE** といった高度なフレームワークにも対応しています。

## 🛠 Features

- **2つのモード (Phase) (New!)**:
    - **🚀 Initial (初回作成)**: システムプロンプトを一から作成。
    - **🔄 Refinement (修正・追加QA)**: 既存の文脈を踏まえた、追加指示やQA用のプロンプトを作成。
- **多様なテンプレート**:
    - **Initial**: アプリ開発 (目的重視)、企画、記事執筆など。
    - **Refinement**: バグ修正、コード改善、機能追加、QA。
- **Few-Shot 対応 (New!)**: 「出力例 (Output Example)」を入力することで、AIに特定のフォーマットを強制させる指示を自動生成。
- **フレームワーク対応**: 
    - **CO-STAR**: Context, Objective, Style, Tone, Audience, Response
    - **CRISPE**: Capacity & Role, Insight, Statement, Personality, Experiment
- **Vibe Coding モード**: 余計な挨拶を省き、即座にコードを出力させる「高速実装」向けの指示を自動挿入。
- **マルチ言語対応**: 日本語 / 英語 をワンクリックで切り替え可能。

## 🚀 Quick Start (Local Setup)

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kenmero/prompt-generator.git
   cd prompt-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser:
   Access `http://localhost:5173` to see the app running.

## 🏗 Architecture & Tech Stack

このプロジェクトは、モダンで軽量なフロントエンドスタックを採用しています。

### Tech Stack
- **Framework**: [React](https://react.dev/) (v18)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (CSS Variables for themes, Flexbox/Grid for layout) - No heavy UI frameworks.

### Directory Structure

```
prompt-generator/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Card.tsx      # Main wrapper styled component
│   │   ├── Button.tsx
│   │   ├── DynamicForm.tsx # Renders inputs based on template config
│   │   └── ...
│   ├── lib/              # Core Logic
│   │   ├── promptConfig.ts # 🌟 Template Definitions (Add new frameworks here)
│   │   └── generator.ts    # ⚙️ Logic to combine inputs into a prompt
│   ├── App.tsx           # Main Application Layout & State Management
│   └── main.tsx          # Entry point
├── public/               # Static assets
└── package.json
```

### 主なロジックフロー

1. **テンプレート選択**: ユーザーがテンプレートを選択します（`promptConfig.ts`で定義）。
2. **フォーム描画**: `DynamicForm` コンポーネントが、選択されたテンプレートのスキーマに基づいて入力フィールドを動的に描画します。
3. **プロンプト生成**: 「生成」ボタンが押されると、`generator.ts` 内の `generateMetaPrompt` 関数が呼び出されます。
   - AIのペルソナ、目的、ユーザーの入力内容を結合し、構造化されたMarkdown形式のプロンプトを作成します。
   - Vibe Codingモードやフレームワーク（CO-STAR/CRISPE）が有効な場合、それぞれの特有の指示条件を条件付きで注入します。
4. **出力**: 生成されたプロンプトが `PromptPreview` に表示され、ワンクリックでコピーできます。

## 🤝 Contributing

新しいプロンプトテンプレートの追加は非常に簡単です！
`src/lib/promptConfig.ts` に新しいオブジェクトを追加するだけで、自動的にUIに反映されます。

---
Created by kenmero
