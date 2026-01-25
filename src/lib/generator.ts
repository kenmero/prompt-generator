import type { PromptTemplate } from './promptConfig';
import type { Language } from './promptConfig';

export const generateMetaPrompt = (
    template: PromptTemplate,
    formData: Record<string, string>,
    isVibeCoding: boolean,
    lang: Language
): string => {
    const isJa = lang === 'ja';

    // 1. Meta-Role: Who we are asking to write the prompt?
    // We are asking ChatGPT to be a "Prompt Engineer".
    let prompt = isJa
        ? `あなたは世界最高峰のプロンプトエンジニアです。\n`
        : `You are a world-class Prompt Engineer.\n`;

    prompt += isJa
        ? `以下の要件に基づき、AIエージェントに対して指示するための**最高のシステムプロンプト**を作成してください。\n\n`
        : `Based on the requirements below, please create the **ultimate System Prompt** to instruct an AI agent.\n\n`;

    // 2. Target Role & Goal
    // Who the final AI should act as.
    const customRole = formData['custom_role'];
    const targetRole = (customRole && customRole.trim())
        ? customRole
        : (isJa ? template.systemRole.ja : template.systemRole.en);

    prompt += isJa ? `## 作成するプロンプトの要件\n` : `## Requirements for the Prompt\n`;

    prompt += isJa
        ? `- **AIの役割**: ${targetRole}\n`
        : `- **Target AI Role**: ${targetRole}\n`;

    prompt += isJa
        ? `- **タスクの目的**: ${template.description.ja}\n`
        : `- **Objective**: ${template.description.en}\n`;

    // 2.5 Framework Specific Instructions
    if (template.id === 'costar') {
        prompt += isJa
            ? `\n## 重要: CO-STARフレームワークの適用\n以下の入力情報を、**CO-STARフレームワーク (Context, Objective, Style, Tone, Audience, Response)** の各要素として解釈し、それらを厳密に反映したプロンプトを作成してください。\n`
            : `\n## IMPORTANT: Apply CO-STAR Framework\nPlease interpret the user input below as elements of the **CO-STAR Framework (Context, Objective, Style, Tone, Audience, Response)** and create a prompt that strictly reflects them.\n`;
    } else if (template.id === 'crispe') {
        prompt += isJa
            ? `\n## 重要: CRISPEフレームワークの適用\n以下の入力情報を、**CRISPEフレームワーク (Capacity, Role, Insight, Statement, Personality, Experiment)** の各要素として解釈し、最適化されたプロンプトを作成してください。\n`
            : `\n## IMPORTANT: Apply CRISPE Framework\nPlease interpret the user input below as elements of the **CRISPE Framework (Capacity, Role, Insight, Statement, Personality, Experiment)** and create an optimized prompt.\n`;
    }


    // Special logic for Review Template to differentiate Review vs Checklist
    if (template.id === 'review' && formData['type']) {
        const type = formData['type'];
        if (type === 'checklist') {
            prompt += isJa
                ? `- **重要**: コードの修正案ではなく、「チェックリスト形式」で出力してください。\n`
                : `- **Important**: Output as a "Checklist", not a code correction.\n`;
        } else {
            prompt += isJa
                ? `- **重要**: 具体的な修正案と、修正後のコード例を提示してください。\n`
                : `- **Important**: Provide specific correction proposals and code examples.\n`;
        }
    }

    // 3. Examples (Few-Shot Prompting) - NEW! based on OpenAI Gap Analysis
    const examples = formData['examples'];
    if (examples && examples.trim()) {
        prompt += isJa ? `\n## 参考事例 (Few-Shot Examples)\n` : `\n## Examples (Few-Shot)\n`;
        prompt += examples + '\n';
    }

    // 4. User Input Context
    prompt += isJa ? `\n## ユーザーの入力情報（これを踏まえて作成してください）\n` : `\n## User Input Context (Incorporate this)\n`;

    template.fields.forEach(field => {
        // Use formData value, fallback to defaultValue if exists
        const value = formData[field.id] || field.defaultValue;
        if (value && value.trim()) {
            const label = isJa ? field.label.ja : field.label.en;
            prompt += `- **${label}**: ${value}\n`;
        }
    });

    // 4. Vibe Coding / Style Instructions
    prompt += `\n`;
    if (isVibeCoding) {
        prompt += isJa ? `## 【重要】Vibe Coding モードの適用\n` : `## [IMPORTANT] Apply Vibe Coding Mode\n`;
        prompt += isJa
            ? `作成するプロンプトには、以下の**Vibe Coding（高速実装）**の原則をAIに強制する指示を必ず含めてください：\n`
            : `Ensure the generated prompt includes strict instructions enforcing the **Vibe Coding** principles:\n`;

        prompt += isJa
            ? `- 挨拶や社交辞令を一切省く（No yapping）。\n` +
            `- 聞かれる前にコードの完成形を書く（Proactive implementation）。\n` +
            `- 不足情報は常識の範囲で勝手に補完し、質問ラリーを減らす（Autonomy）。\n` +
            `- コードは常にProduction Readyの実装にする。\n`
            : `- Skip all pleasantries and intros (No yapping).\n` +
            `- Provide complete working code immediately (Proactive).\n` +
            `- Fill in missing details automatously to reduce back-and-forth.\n` +
            `- Always output Production Ready code.\n`;
    } else {
        // Standard / Learning Plan Mode
        prompt += isJa ? `## 出力スタイルの指定\n` : `## Output Style Instructions\n`;
        prompt += isJa
            ? `作成するプロンプトは、以下のスタイルをAIに指示するものにしてください：\n` +
            `- 非常に丁寧かつ、構造化された出力を促す。\n` +
            `- ステップバイステップで思考プロセスを開示させる。\n` +
            `- 必要に応じてユーザーに確認質問を行うよう指示する。\n`
            : `Ensure the generated prompt instructs the AI to:\n` +
            `- Be extremely thorough and structured.\n` +
            `- Explain reasoning step-by-step.\n` +
            `- Ask clarifying questions if necessary.\n`;
    }

    // 5. Final Output Directive
    prompt += `\n`;
    prompt += isJa
        ? `## 成果物\n上記の要件を全て満たす、実用的で高品質なシステムプロンプトのみをMarkdownコードブロックで出力してください。解説は不要です。`
        : `## Final Output\nPlease output ONLY the resulting high-quality System Prompt in a Markdown code block. No explanation needed.`;

    return prompt;
};
