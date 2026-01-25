# Prompt Generator 🚀

**Prompt Generator** は、ChatGPTやGeminiなどのLLM（大規模言語モデル）の能力を最大限に引き出すための「メタプロンプト」を作成するWebアプリケーションです。

専門的なプロンプトエンジニアリングの知識がなくても、目的に応じた項目（`promptConfig.ts`で定義）を埋めるだけで、高品質なシステムプロンプトを生成できます。Vibe Codingの原則に基づいた「高速実装モード」や、**CO-STAR / CRISPE** といった高度なフレームワークにも対応しています。

## 🛠 Features

- **多様なテンプレート**: アプリ開発、バグ修正、学習計画など、目的別のテンプレートを用意。
- **フレームワーク対応 (New!)**: 
    - **CO-STAR**: Context, Objective, Style, Tone, Audience, Response
    - **CRISPE**: Capacity, Insight, Statement, Personality, Experiment
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

### Key Logic Flow

1. **Template Selection**: User selects a template (defined in `promptConfig.ts`).
2. **Form Rendering**: `DynamicForm` renders fields dynamically based on the selected template's schema.
3. **Generation**: When "Generate" is clicked, `generateMetaPrompt` inside `generator.ts` is called.
   - It combines the system persona, goal description, and user inputs into a structured Markdown prompt.
   - It conditionally injects Vibe Coding instructions or Framework (CO-STAR/CRISPE) rules.
4. **Output**: The result is displayed in `PromptPreview` for easy copying.

## 🤝 Contributing

新しいプロンプトテンプレートの追加は非常に簡単です！
`src/lib/promptConfig.ts` に新しいオブジェクトを追加するだけで、自動的にUIに反映されます。

---
Created by kenmero
