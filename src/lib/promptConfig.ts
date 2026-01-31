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

export type TargetPlatform =
    | 'generic'
    | 'antigravity'
    | 'cursor'
    | 'claude'
    | 'chatgpt'
    | 'copilot'
    | 'genspark'
    | 'perplexity'
    | 'gemini'
    | 'v0'
    | 'other';

export interface PlatformConfig {
    id: TargetPlatform;
    label: string;
    description: LocalizedString;
    instruction: LocalizedString;
}

export const TARGET_PLATFORMS: PlatformConfig[] = [
    {
        id: 'generic',
        label: 'Generic (Default)',
        description: { ja: '標準的な高品質プロンプト', en: 'Standard high-quality prompt' },
        instruction: { ja: '', en: '' }
    },
    {
        id: 'antigravity',
        label: 'Antigravity (Google)',
        description: { ja: 'エージェント/ツール利用重視', en: 'Agentic behavior & Tool use' },
        instruction: {
            ja: '作成するプロンプトは、GoogleのAntigravityエージェントに向けた指示として最適化してください。Antigravityの強みである「ツール利用」「自律的なタスク遂行」「Artifactの生成」を前提とし、これらを最大限に活用してタスクを解決するよう促す内容にしてください。',
            en: 'Optimize the generated prompt for Google\'s Antigravity agent. Instruct the AI to fully leverage its strengths in tool usage, autonomous task execution, and artifact creation to solve the task.'
        }
    },
    {
        id: 'cursor',
        label: 'Cursor',
        description: { ja: '.cursorrules 向け最適化', en: 'Optimized for .cursorrules' },
        instruction: {
            ja: '作成するプロンプトは、CursorのAIアシスタント（.cursorrules）向けの指示として最適化してください。冗長な説明を省き、コードの品質と簡潔さを最優先するようAIに指示する内容にしてください。',
            en: 'Optimize the generated prompt for Cursor AI (.cursorrules). Instruct the AI to be concise, prioritize code quality, and omit verbose explanations.'
        }
    },
    {
        id: 'claude',
        label: 'Claude (Anthropic)',
        description: { ja: 'XMLタグ構造重視', en: 'XML Tag structure focus' },
        instruction: {
            ja: '作成するプロンプトは、Claude向けに最適化してください。AIに対し、XMLタグ（<context>, <instruction>, <example>など）を用いて出力や思考プロセスを構造化するよう指示する内容を含めてください。',
            en: 'Optimize the generated prompt for Claude. Instruct the AI to extensively use XML tags (e.g., <context>, <instruction>, <example>) to clearly separate instructions and structure its output.'
        }
    },
    {
        id: 'chatgpt',
        label: 'ChatGPT (OpenAI)',
        description: { ja: 'Chain of Thought重視', en: 'Chain of Thought focus' },
        instruction: {
            ja: '作成するプロンプトは、ChatGPT向けに最適化してください。複雑なタスクに対しては「ステップバイステップで考えて」という指示や、思考プロセス（Chain of Thought）の開示を求める指示をAIへの命令として含めてください。',
            en: 'Optimize the generated prompt for ChatGPT. Include specific instructions for the AI to "Think step-by-step" or use Chain of Thought (CoT) for complex tasks.'
        }
    },
    {
        id: 'copilot',
        label: 'GitHub Copilot',
        description: { ja: '直接的・命令的指示', en: 'Direct, imperative instructions' },
        instruction: {
            ja: '作成するプロンプトは、GitHub Copilot Chat向けに最適化してください。エディタ内でのコーディング支援に特化し、解説よりも修正後のコードそのものを提示するよう、短く明確な命令形でAIに指示する内容にしてください。',
            en: 'Optimize the generated prompt for GitHub Copilot Chat. Instruct the AI to focus on in-editor coding assistance and use short, clear, imperative commands, prioritizing code output.'
        }
    },
    {
        id: 'genspark',
        label: 'Genspark',
        description: { ja: 'Sparkpage生成/自律性', en: 'Sparkpage generation & Autonomy' },
        instruction: {
            ja: '作成するプロンプトは、Genspark向けに最適化してください。AIに対し、Sparkpageの生成機能や、検索を伴う自律的なリサーチ能力を最大限に活用するよう指示する内容を含めてください。',
            en: 'Optimize the generated prompt for Genspark. Instruct the AI to leverage Sparkpage generation and autonomous research capabilities with web search.'
        }
    },
    {
        id: 'perplexity',
        label: 'Perplexity',
        description: { ja: 'リサーチ/引用重視', en: 'Research & Citations focus' },
        instruction: {
            ja: '作成するプロンプトは、Perplexity向けに最適化してください。AIに対し、情報の正確性と出典（引用）の明記を最重視し、包括的なリサーチを行うよう指示する内容を含めてください。',
            en: 'Optimize the generated prompt for Perplexity. Instruct the AI to prioritize accuracy, conduct comprehensive research, and clearly cite sources.'
        }
    },
    {
        id: 'gemini',
        label: 'Gemini (Google)',
        description: { ja: 'マルチモーダル/長文脈', en: 'Multimodal / Long context' },
        instruction: {
            ja: '作成するプロンプトは、Google Gemini向けに最適化してください。長いコンテキストの理解や、マルチモーダル入力への対応を考慮した振る舞いをAIに指示する内容にしてください。',
            en: 'Optimize the generated prompt for Google Gemini. Instruct the AI to leverage its long-context understanding capabilities and handle multimodal inputs effectively.'
        }
    },
    {
        id: 'v0',
        label: 'v0 (Vercel)',
        description: { ja: 'UI生成 (React/Tailwind)', en: 'UI Gen (React/Tailwind)' },
        instruction: {
            ja: '作成するプロンプトは、v0.dev向けに最適化してください。AIに対し、最新のReact、Tailwind CSS、shadcn/uiを使用したモダンで美しいUIコンポーネントを生成するよう指示する内容を含めてください。',
            en: 'Optimize the generated prompt for v0.dev. Instruct the AI to generate modern, beautiful UI components using the latest React, Tailwind CSS, and shadcn/ui.'
        }
    },
    {
        id: 'other',
        label: 'Other (Custom)',
        description: { ja: '任意のAIを指定', en: 'Specify custom AI' },
        instruction: { ja: '', en: '' } // Handled dynamically
    }
];

export type PromptPhase = 'initial' | 'refinement';

export interface PromptTemplate {
    id: string;
    phase: PromptPhase;
    label: LocalizedString;
    vibeCodingDefault: boolean;
    description: LocalizedString;
    systemRole?: LocalizedString; // Optional for refinement
    fields: PromptField[];
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
    {
        id: 'code',
        phase: 'initial',
        label: { ja: 'システム / アプリ開発', en: 'System / App Development' },
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
                id: 'goal',
                label: { ja: '開発のゴール / アプリ概要', en: 'Project Goal / App Description' },
                type: 'textarea',
                placeholder: { ja: '何を作りたいか、アプリの全体像を詳しく記述...', en: 'Describe the app or feature you want to build...' },
                defaultValue: ''
            },
            {
                id: 'features',
                label: { ja: '主要な機能要件', en: 'Key Features' },
                type: 'textarea',
                placeholder: { ja: '- ログイン機能\n- リアルタイムチャット\n- ダークモード対応...', en: '- Auth\n- Real-time chat\n- Dark mode...' }
            },
            {
                id: 'tech_stack',
                label: { ja: '技術スタック / 制約条件', en: 'Tech Stack / Constraints' },
                type: 'textarea',
                placeholder: { ja: 'React, TypeScript, TailwindCSS, AWSなど', en: 'React, TS, Tailwind, AWS etc.' }
            },
            {
                id: 'output_example',
                label: { ja: '出力例 (Few-Shot/Style)', en: 'Output Example / Style' },
                type: 'textarea',
                placeholder: { ja: '期待するコードの書き方や応答のスタイル...', en: 'Preferred coding style or response format...' }
            }
        ]
    },
    // Removed bugfix_initial (Use Refinement > Fix Bug)
    // Removed refactor_initial (Use Refinement > Refine Code)
    {
        id: 'writing',
        phase: 'initial',
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
            },
            {
                id: 'output_example',
                label: { ja: '出力例 (Few-Shot/Style)', en: 'Output Example / Style' },
                type: 'textarea',
                placeholder: { ja: '記事のトーンやスタイル、構成の例...', en: 'Tone, style, or structure example...' }
            }
        ]
    },
    {
        id: 'review',
        phase: 'initial',
        label: { ja: 'レビュー / チェックリスト作成', en: 'Code/Design Review & Checklist' },
        vibeCodingDefault: false,
        description: {
            ja: 'コードや設計のレビュー、またはレビュー用チェックリストの作成を依頼します。',
            en: 'Request a code/design review or create a review checklist.'
        },
        systemRole: {
            ja: 'プリンシパルエンジニア / QAスペシャリスト',
            en: 'Principal Engineer & QA Specialist'
        },
        fields: [
            {
                id: 'type',
                label: { ja: '依頼タイプ', en: 'Request Type' },
                type: 'select',
                options: [
                    { value: 'review', label: { ja: 'コード/設計のレビュー', en: 'Perform Review' } },
                    { value: 'checklist', label: { ja: 'レビュー用チェックリスト作成', en: 'Create Checklist' } }
                ]
            },
            {
                id: 'content',
                label: { ja: '対象コンテンツ', en: 'Target Content' },
                type: 'textarea',
                placeholder: { ja: 'ここにレビュー対象のテキストデータ（コード、仕様書の概要など）を貼り付けてください。※ファイルアップロード機能はありません', en: 'Paste the text content here (code snippet, specs, etc.). File upload is not supported.' }
            },
            {
                id: 'criteria',
                label: { ja: '重点確認項目', en: 'Review Criteria' },
                type: 'textarea',
                defaultValue: '誤字脱字、体裁の統一、命名規則、セキュリティ、パフォーマンス、可読性',
                placeholder: { ja: '特定の観点があれば追加してください...', en: 'Add specific criteria if needed...' }
            },
            {
                id: 'output_example',
                label: { ja: '出力例 (Few-Shot)', en: 'Output Example' },
                type: 'textarea',
                placeholder: { ja: '期待する指摘の仕方やレポート形式...', en: 'Expected report format or style...' }
            }
        ]
    },
    {
        id: 'learning',
        phase: 'initial',
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
            },
            {
                id: 'output_example',
                label: { ja: '出力例 (Few-Shot)', en: 'Output Example' },
                type: 'textarea',
                placeholder: { ja: '期待するカリキュラムの形式...', en: 'Expected curriculum format...' }
            }
        ]
    },
    {
        id: 'planning',
        phase: 'initial',
        label: { ja: '企画・提案 / アイデア出し', en: 'Planning & Proposal' },
        vibeCodingDefault: false,
        description: {
            ja: '新規プロジェクトの企画、アイデア出し、提案書の構成案などを依頼します。',
            en: 'Brainstorm ideas, plan new projects, or draft proposal structures.'
        },
        systemRole: {
            ja: 'プロジェクトマネージャー / クリエイティブディレクター',
            en: 'Project Manager & Creative Director'
        },
        fields: [
            {
                id: 'theme',
                label: { ja: 'テーマ・お題', en: 'Theme / Topic' },
                type: 'text',
                placeholder: { ja: '例: 新しいスマホアプリの企画、社内イベント', en: 'e.g. New App Idea, Company Event' }
            },
            {
                id: 'target_audience',
                label: { ja: 'ターゲット層', en: 'Target Audience' },
                type: 'text',
                placeholder: { ja: '例: 20代女性、エンジニア', en: 'e.g. 20s Female, Engineers' }
            },
            {
                id: 'goal',
                label: { ja: '企画のゴール', en: 'Goal' },
                type: 'textarea',
                placeholder: { ja: '例: ユーザー数1万人、チームの結束強化', en: 'e.g. 10k Users, Team Bonding' }
            },
            {
                id: 'requirements',
                label: { ja: '要件・制約メモ', en: 'Requirements / Notes' },
                type: 'textarea',
                placeholder: { ja: '予算感、必須機能など...', en: 'Budget, Must-have features...' }
            },
            {
                id: 'output_example',
                label: { ja: '出力例 (Few-Shot)', en: 'Output Example' },
                type: 'textarea',
                placeholder: { ja: 'アイデアの提示形式や企画書の構成例...', en: 'Output format example...' }
            }
        ]
    },
    {
        id: 'costar',
        phase: 'initial',
        label: { ja: 'CO-STAR フレームワーク', en: 'CO-STAR Framework' },
        vibeCodingDefault: false,
        description: {
            ja: '文脈、目的、文体などを明確に定義し、ビジネス文書や指示の品質を劇的に向上させます。',
            en: 'Define Context, Objective, Style, etc. to dramatically improve the quality of business docs and instructions.'
        },
        systemRole: {
            ja: '数々の賞を受賞したビジネス・コミュニケーションの専門家',
            en: 'Award-winning Business Communication Expert'
        },
        fields: [
            {
                id: 'context',
                label: { ja: 'C: Context (背景・文脈)', en: 'C: Context' },
                type: 'textarea',
                placeholder: { ja: '私が誰で、どんな状況にあるか...', en: 'Who I am, what is the situation...' }
            },
            {
                id: 'objective',
                label: { ja: 'O: Objective (目的)', en: 'O: Objective' },
                type: 'textarea',
                placeholder: { ja: '何を達成したいか...', en: 'What do you want to achieve...' }
            },
            {
                id: 'style',
                label: { ja: 'S: Style (文体)', en: 'S: Style' },
                type: 'text',
                placeholder: { ja: '例: ビジネスライク、親しみやすく、Appleの広告風', en: 'e.g. Business-like, Friendly, Like an Apple Ad' }
            },
            {
                id: 'tone',
                label: { ja: 'T: Tone (トーン)', en: 'T: Tone' },
                type: 'text',
                placeholder: { ja: '例: 断定的、共感的、情熱的', en: 'e.g. Assertive, Empathetic, Passionate' }
            },
            {
                id: 'audience',
                label: { ja: 'A: Audience (対象読者)', en: 'A: Audience' },
                type: 'text',
                placeholder: { ja: '例: 初心者、経営層、5歳の子供', en: 'e.g. Beginners, Executives, A 5-year-old' }
            },
            {
                id: 'response',
                label: { ja: 'R: Response (出力形式)', en: 'R: Response Format' },
                type: 'text',
                placeholder: { ja: '例: JSON、Markdownの表、箇条書き', en: 'e.g. JSON, Markdown Table, Bullet points' }
            },
            {
                id: 'examples',
                label: { ja: 'Examples (実例・Few-Shot)', en: 'Examples / Few-Shot' },
                type: 'textarea',
                placeholder: { ja: '入力と出力のペアを提示すると精度が向上します...\n入力: ...\n出力: ...', en: 'Provide examples to improve accuracy...\nInput: ...\nOutput: ...' }
            }
        ]
    },
    {
        id: 'crispe',
        phase: 'initial',
        label: { ja: 'CRISPE フレームワーク', en: 'CRISPE Framework' },
        vibeCodingDefault: false,
        description: {
            ja: '複雑な役割定義や、創造的なタスクに最適化されたフレームワークです。',
            en: 'Optimized framework for complex role definitions and creative tasks.'
        },
        systemRole: {
            ja: '適応力の高いエキスパートAI',
            en: 'Highly Adaptive Expert AI'
        },
        fields: [
            {
                id: 'capacity',
                label: { ja: 'CR: Capacity & Role (能力・役割)', en: 'CR: Capacity & Role' },
                type: 'text',
                placeholder: { ja: '例: あなたは〇〇の専門家であり、辛口の批評家として振る舞ってください', en: 'e.g. Act as an expert in X and behave as a harsh critic' }
            },
            {
                id: 'insight',
                label: { ja: 'I: Insight (背景情報・洞察)', en: 'I: Insight & Context' },
                type: 'textarea',
                placeholder: { ja: '必要な背景情報、データの詳細など...', en: 'Background info, data details...' }
            },
            {
                id: 'statement',
                label: { ja: 'S: Statement (命令)', en: 'S: Statement' },
                type: 'textarea',
                placeholder: { ja: '具体的に何をしてほしいか...', en: 'What specifically do you want done...' }
            },
            {
                id: 'personality',
                label: { ja: 'P: Personality (スタイル・人格)', en: 'P: Personality' },
                type: 'text',
                placeholder: { ja: '例: 辛口で、ユーモアを交えて', en: 'e.g. Witty, Sarcastic, Professional' }
            },
            {
                id: 'experiment',
                label: { ja: 'E: Experiment (試行範囲・制約)', en: 'E: Experiment / Constraints' },
                type: 'textarea',
                placeholder: { ja: '例: 複数の選択肢を提示して、特定の単語は禁止', en: 'e.g. Give multiple options, avoid certain words' }
            },
            {
                id: 'examples',
                label: { ja: 'Examples (実例・Few-Shot)', en: 'Examples / Few-Shot' },
                type: 'textarea',
                placeholder: { ja: '成功パターンの例を提示してください...', en: 'Provide examples of successful patterns...' }
            }
        ]
    },

    {
        id: 'custom',
        phase: 'initial',
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
            },
            {
                id: 'examples',
                label: { ja: '実例 (Few-Shot)', en: 'Examples / Few-Shot' },
                type: 'textarea',
                placeholder: { ja: '例: 良い回答例など', en: 'e.g. Good response examples' }
            }
        ]
    },
    // --- Refinement Templates ---
    {
        id: 'refine_code',
        phase: 'refinement',
        label: { ja: '✨ コード改善 / 最適化', en: 'Refine / Optimize Code' },
        vibeCodingDefault: true,
        description: {
            ja: '既存のコードを改善します（パフォーマンス、可読性、セキュリティなど）。',
            en: 'Improve existing code (Performance, Readability, Security, etc).'
        },
        fields: [
            {
                id: 'code',
                label: { ja: '現在のコード', en: 'Current Code' },
                type: 'textarea',
                placeholder: { ja: '改善したいコードを貼り付けてください...', en: 'Paste the code to refine...' }
            },
            {
                id: 'goal',
                label: { ja: '改善のゴール', en: 'Optimization Goal' },
                type: 'text',
                placeholder: { ja: '例: 実行速度の向上、可読性の向上、最新構文への書き換え', en: 'e.g. Improve speed, Better readability, Modern syntax' }
            },
            {
                id: 'output_example',
                label: { ja: '出力例 (Few-Shot/Format)', en: 'Output Example / Format' },
                type: 'textarea',
                placeholder: { ja: '期待する出力形式や例を入力 (例: 変更点のみのdiff形式、コメント付きのフルコード等)', en: 'Expected format or example (e.g. Diff only, Full code with comments)' }
            }
        ]
    },
    {
        id: 'fix_bug',
        phase: 'refinement',
        label: { ja: '🐛 バグ修正 / エラー対応', en: 'Fix Bug / Resolve Error' },
        vibeCodingDefault: true,
        description: {
            ja: '発生しているエラーやバグを修正するための指示を作成します。',
            en: 'Create instructions to fix a specific bug or error.'
        },
        fields: [
            {
                id: 'context',
                label: { ja: '状況 / 文脈', en: 'Context (What happened)' },
                type: 'textarea',
                placeholder: { ja: 'どのような操作をしたか、現在のコードの概要など...', en: 'What you did, summary of current code...' }
            },
            {
                id: 'error_log',
                label: { ja: 'エラーメッセージ / ログ', en: 'Error Message / Log' },
                type: 'textarea',
                placeholder: { ja: 'エラーログを貼り付けてください...', en: 'Paste the error log...' }
            },
            {
                id: 'output_example',
                label: { ja: '出力形式の希望', en: 'Desired Output Format' },
                type: 'text',
                placeholder: { ja: '例: 原因の解説と修正コード、修正箇所のdiffのみ', en: 'e.g. Explanation + Fix, Diff only' }
            }
        ]
    },
    {
        id: 'add_feature',
        phase: 'refinement',
        label: { ja: '➕ 機能追加', en: 'Add Feature' },
        vibeCodingDefault: true,
        description: {
            ja: '既存のコードやプロジェクトに新しい機能を追加します。',
            en: 'Add a new feature to existing code or project.'
        },
        fields: [
            {
                id: 'context',
                label: { ja: '現在の文脈 / コード', en: 'Current Context / Code' },
                type: 'textarea',
                placeholder: { ja: '関連する既存コードや現状の説明...', en: 'Existing code or current state...' }
            },
            {
                id: 'feature_desc',
                label: { ja: '追加したい機能の詳細', en: 'New Feature Description' },
                type: 'textarea',
                placeholder: { ja: 'どのような機能を追加したいか具体的に...', en: 'Describe the feature in detail...' }
            },
            {
                id: 'output_example',
                label: { ja: '出力例 (Few-Shot)', en: 'Output Example / Format' },
                type: 'textarea',
                placeholder: { ja: '期待する実装のイメージや形式...', en: 'Expected implementation style or format...' }
            }
        ]
    },
    {
        id: 'qa_explain',
        phase: 'refinement',
        label: { ja: '❓ 質問 / 解説 (QA)', en: 'Question / Explanation' },
        vibeCodingDefault: false,
        description: {
            ja: 'コードや概念について質問したり、解説を求めます。',
            en: 'Ask questions or request explanations about code/concepts.'
        },
        fields: [
            {
                id: 'target',
                label: { ja: '対象のトピック / コード', en: 'Target Topic / Code' },
                type: 'textarea',
                placeholder: { ja: '解説してほしいコードや用語...', en: 'Code or term to explain...' }
            },
            {
                id: 'question',
                label: { ja: '具体的な質問内容', en: 'Specific Question' },
                type: 'textarea',
                placeholder: { ja: '何について知りたいですか？ (例: この関数の計算ロジックは？)', en: 'What do you want to know? (e.g. How does this logic work?)' }
            }
        ]
    }
];
