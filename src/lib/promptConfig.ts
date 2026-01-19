export type Language = 'ja' | 'en';
export type LocalizedString = Record<Language, string>;

export type FieldType = 'text' | 'textarea' | 'select';

export interface PromptField {
    id: string;
    label: LocalizedString;
    type: FieldType;
    placeholder?: LocalizedString;
    options?: { value: string; label: LocalizedString }[];
    defaultValue?: string;
}

export interface PromptTemplate {
    id: string;
    label: LocalizedString;
    vibeCodingDefault: boolean;
    description: LocalizedString;
    systemRole: LocalizedString;
    fields: PromptField[];
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
    {
        id: 'code',
        label: { ja: 'コード生成', en: 'Code Generation' },
        vibeCodingDefault: true,
        description: {
            ja: '特定の機能やアプリのための、本番品質のコードを生成します。',
            en: 'Generate production-ready code for a specific feature or application.'
        },
        systemRole: {
            ja: 'ソフトウェアアーキテクト兼フルスタックエンジニア',
            en: 'Senior Software Architect & Full-Stack Developer'
        },
        fields: [
            {
                id: 'language',
                label: { ja: '使用言語', en: 'Language(s)' },
                type: 'text',
                placeholder: { ja: '例: TypeScript, Python, Rust', en: 'e.g. TypeScript, Python, Rust' }
            },
            {
                id: 'framework',
                label: { ja: 'フレームワーク / スタック', en: 'Framework / Stack' },
                type: 'text',
                placeholder: { ja: '例: Next.js, FastAPI, Shadcn UI', en: 'e.g. Next.js, FastAPI, Shadcn UI' }
            },
            {
                id: 'goal',
                label: { ja: '何を作りたいですか？', en: 'What do you want to build?' },
                type: 'textarea',
                placeholder: { ja: '機能やアプリの詳細を記述してください...', en: 'Describe the feature or application in detail...' },
                defaultValue: ''
            },
            {
                id: 'constraints',
                label: { ja: '制約条件', en: 'Key Constraints' },
                type: 'textarea',
                placeholder: { ja: '- 外部ライブラリ禁止\n- Tailwind必須...', en: '- No external heavy libs\n- Must use Tailwind...' }
            }
        ]
    },
    {
        id: 'bugfix',
        label: { ja: 'バグ修正 / デバッグ', en: 'Bug Fix / Debugging' },
        vibeCodingDefault: true,
        description: {
            ja: 'エラーやバグの原因を特定し、修正します。',
            en: 'Diagnose and fix a specific error or bug.'
        },
        systemRole: {
            ja: 'デバッグのスペシャリスト',
            en: 'Expert Debugging Specialist'
        },
        fields: [
            {
                id: 'context',
                label: { ja: 'テックスタック', en: 'Tech Stack' },
                type: 'text',
                placeholder: { ja: '例: React 18, Node.js 20', en: 'e.g. React 18, Node.js 20' }
            },
            {
                id: 'error',
                label: { ja: 'エラーログ', en: 'Error Logs' },
                type: 'textarea',
                placeholder: { ja: 'エラーメッセージやスタックトレースを貼り付けてください...', en: 'Paste the error message or stack trace here...' }
            },
            {
                id: 'code',
                label: { ja: '問題のコード', en: 'Problematic Code' },
                type: 'textarea',
                placeholder: { ja: '関連するコードスニペットを貼り付けてください...', en: 'Paste the relevant code snippet...' }
            },
            {
                id: 'behavior',
                label: { ja: '現状の挙動 vs 期待する挙動', en: 'Current vs Expected Behavior' },
                type: 'textarea',
                placeholder: { ja: 'Xをクリックすると落ちるが、Yが開くべき...', en: 'It crashes when I click X, but should open Y...' }
            }
        ]
    },
    {
        id: 'refactor',
        label: { ja: 'コードリファクタリング', en: 'Code Refactoring' },
        vibeCodingDefault: true,
        description: {
            ja: '既存のコードを最適化・整理します。',
            en: 'Optimize and clean up existing code.'
        },
        systemRole: {
            ja: 'シニアコード品質エンジニア',
            en: 'Senior Code Quality Engineer'
        },
        fields: [
            {
                id: 'language',
                label: { ja: '言語', en: 'Language' },
                type: 'text'
            },
            {
                id: 'code',
                label: { ja: 'リファクタリング対象コード', en: 'Code to Refactor' },
                type: 'textarea',
                placeholder: { ja: 'コードをここに貼り付け...', en: 'Paste code here...' }
            },
            {
                id: 'focus',
                label: { ja: '重点ポイント', en: 'Refactoring Focus' },
                type: 'select',
                options: [
                    { value: 'performance', label: { ja: 'パフォーマンス', en: 'Performance' } },
                    { value: 'readability', label: { ja: '可読性・クリーンコード', en: 'Readability & Clean Code' } },
                    { value: 'security', label: { ja: 'セキュリティ', en: 'Security' } },
                    { value: 'modernization', label: { ja: 'モダナイズ（最新化）', en: 'Modernization (Updates)' } }
                ]
            }
        ]
    },
    {
        id: 'writing',
        label: { ja: '技術記事 / ドキュメント作成', en: 'Technical Writing' },
        vibeCodingDefault: false,
        description: {
            ja: '技術ドキュメントや記事を作成します。',
            en: 'Write technical documentation or articles.'
        },
        systemRole: {
            ja: 'シニアテクニカルライター',
            en: 'Staff Technical Writer'
        },
        fields: [
            {
                id: 'topic',
                label: { ja: 'トピック', en: 'Topic' },
                type: 'text',
                placeholder: { ja: '例: Dockerの使い方について', en: 'e.g. How to use Docker' }
            },
            {
                id: 'audience',
                label: { ja: 'ターゲット読者', en: 'Target Audience' },
                type: 'select',
                options: [
                    { value: 'beginner', label: { ja: '初心者', en: 'Beginner' } },
                    { value: 'intermediate', label: { ja: '中級者', en: 'Intermediate' } },
                    { value: 'expert', label: { ja: '上級者・専門家', en: 'Expert' } }
                ]
            },
            {
                id: 'format',
                label: { ja: 'フォーマット', en: 'Format' },
                type: 'select',
                options: [
                    { value: 'blog', label: { ja: 'ブログ記事', en: 'Blog Post' } },
                    { value: 'docs', label: { ja: '公式ドキュメント風', en: 'Documentation' } },
                    { value: 'tutorial', label: { ja: 'ハンズオンチュートリアル', en: 'Step-by-step Tutorial' } },
                    { value: 'readme', label: { ja: 'README.md', en: 'README.md' } }
                ]
            },
            {
                id: 'points',
                label: { ja: '含めるべきポイント', en: 'Key Points to Cover' },
                type: 'textarea',
                placeholder: { ja: '- はじめに\n- インストール方法\n- 使い方...', en: '- Intro\n- Installation\n- Usage...' }
            }
        ]
    },
    {
        id: 'review',
        label: { ja: '設計 / コードレビュー', en: 'Design/Code Review' },
        vibeCodingDefault: false,
        description: {
            ja: 'ベストプラクティスに基づいてレビューを行います。',
            en: 'Review a design or code for best practices.'
        },
        systemRole: {
            ja: 'プリンシパルエンジニア',
            en: 'Principal Engineer'
        },
        fields: [
            {
                id: 'content',
                label: { ja: 'レビュー対象', en: 'Content to Review' },
                type: 'textarea',
                placeholder: { ja: 'コード、アーキテクチャ図、テキストなどを貼り付け...', en: 'Paste code, architecture or text...' }
            },
            {
                id: 'criteria',
                label: { ja: 'レビュー基準', en: 'Review Criteria' },
                type: 'textarea',
                placeholder: { ja: '拡張性、セキュリティ、可読性などを重視...', en: 'Focus on scalability, security, etc.' }
            }
        ]
    },
    {
        id: 'learning',
        label: { ja: '学習計画 / ロードマップ作成', en: 'Learning & Study Plan' },
        vibeCodingDefault: false,
        description: {
            ja: '特定のスキルや技術を習得するための、体系的な学習プランの作成を依頼します。',
            en: 'Request a comprehensive study plan or roadmap to master a specific skill or technology.'
        },
        systemRole: {
            ja: '教育のプロフェッショナル / メンター',
            en: 'Professional Educator & Mentor'
        },
        fields: [
            {
                id: 'topic',
                label: { ja: '学習したいトピック', en: 'Topic to Learn' },
                type: 'text',
                placeholder: { ja: '例: React, 機械学習, 英語', en: 'e.g. React, Machine Learning, English' }
            },
            {
                id: 'current_level',
                label: { ja: '現在のレベル', en: 'Current Level' },
                type: 'text',
                placeholder: { ja: '例: HTML/CSSはわかる、TOEIC 600点', en: 'e.g. Know HTML/CSS, Beginner' }
            },
            {
                id: 'goal_level',
                label: { ja: '目標レベル / ゴール', en: 'Goal Level' },
                type: 'textarea',
                placeholder: { ja: '例: 実務で使えるレベル、自作アプリを公開したい', en: 'e.g. Job ready, Build own app' }
            },
            {
                id: 'duration',
                label: { ja: '学習期間 / 頻度', en: 'Duration / Frequency' },
                type: 'text',
                placeholder: { ja: '例: 3ヶ月、週10時間', en: 'e.g. 3 months, 10h/week' }
            },
            {
                id: 'style',
                label: { ja: '好みの学習スタイル', en: 'Preferred Style' },
                type: 'select',
                options: [
                    { value: 'hands_on', label: { ja: 'ハンズオン（作りながら学ぶ）', en: 'Hands-on (Build to learn)' } },
                    { value: 'theoretical', label: { ja: '理論重視（基礎からじっくり）', en: 'Theoretical (Deep dive)' } },
                    { value: 'certification', label: { ja: '資格取得向け', en: 'Certification Focus' } }
                ]
            }
        ]
    },
    {
        id: 'planning',
        label: { ja: '企画・計画 / チェックリスト作成', en: 'Planning & Checklists' },
        vibeCodingDefault: false,
        description: {
            ja: 'タスクの抜け漏れを防ぐためのチェックリストや、実施計画を作成します。',
            en: 'Create checklists, roadmaps, or implementation plans to ensure nothing is missed.'
        },
        systemRole: {
            ja: 'プロジェクトマネージャー / QAリード',
            en: 'Project Manager & QA Lead'
        },
        fields: [
            {
                id: 'target',
                label: { ja: '対象・トピック', en: 'Target Subject' },
                type: 'text',
                placeholder: { ja: '例: 新機能のリリース手順、コードレビュー', en: 'e.g. Release Process, Code Review' }
            },
            {
                id: 'artifact',
                label: { ja: '作成するもの', en: 'Output Artifact' },
                type: 'select',
                options: [
                    { value: 'checklist', label: { ja: 'チェックリスト', en: 'Checklist' } },
                    { value: 'roadmap', label: { ja: 'ロードマップ / スケジュール', en: 'Roadmap / Schedule' } },
                    { value: 'test_cases', label: { ja: 'テストケース一覧', en: 'Test Cases' } },
                    { value: 'flowchart', label: { ja: 'フローチャート（Mermaid記述）', en: 'Flowchart (Mermaid)' } }
                ]
            },
            {
                id: 'users',
                label: { ja: '利用者 / ターゲット', en: 'Intended Audience' },
                type: 'text',
                placeholder: { ja: '例: 開発チーム全員、新人エンジニア', en: 'e.g. Dev Team, Junior Developers' }
            },
            {
                id: 'items',
                label: { ja: '考慮すべき項目・メモ', en: 'Items to Consider' },
                type: 'textarea',
                placeholder: { ja: '- インフラ確認を含める\n- セキュリティ重視で', en: '- Include infra checks\n- Focus on security' }
            }
        ]
    },
    {
        id: 'custom',
        label: { ja: 'カスタム（自由設定）', en: 'Custom / Universal' },
        vibeCodingDefault: true,
        description: {
            ja: 'あらゆるタスクに対応。AIの役割やゴールを自由に設定できます。',
            en: 'Universal template for any task. Define the AI role and goal yourself.'
        },
        systemRole: {
            ja: '優秀なAIアシスタント',
            en: 'Expert AI Assistant'
        },
        fields: [
            {
                id: 'custom_role',
                label: { ja: 'AIに演じてほしい役割', en: 'AI Role' },
                type: 'text',
                placeholder: { ja: '例: 辛口のUXデザイナー、数学の教授', en: 'e.g. Strict UX Designer, Math Professor' }
            },
            {
                id: 'objective',
                label: { ja: '達成したいゴール', en: 'Goal / Objective' },
                type: 'textarea',
                placeholder: { ja: '何をさせたいか具体的に記述...', en: 'Describe exactly what you want to achieve...' }
            },
            {
                id: 'format',
                label: { ja: '出力形式', en: 'Output Format' },
                type: 'text',
                placeholder: { ja: '例: JSON形式、Markdownの表', en: 'e.g. JSON, Markdown Table' }
            }
        ]
    }
];
