import { useState, useMemo } from 'react';
import { Card } from './components/Card';
import { Button } from './components/Button';
import { Select } from './components/Select';
import { DynamicForm } from './components/DynamicForm';
import { PromptPreview } from './components/PromptPreview';
import { PROMPT_TEMPLATES } from './lib/promptConfig';
import type { Language } from './lib/promptConfig';
import { generateMetaPrompt } from './lib/generator';

function App() {
  const [lang, setLang] = useState<Language>('ja');
  const [selectedTemplateId, setSelectedTemplateId] = useState(PROMPT_TEMPLATES[0].id);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState('');
  const [isVibeCoding, setIsVibeCoding] = useState(PROMPT_TEMPLATES[0].vibeCodingDefault);

  // Localization Dictionary for Static UI
  const UI_TEXT = {
    title: { ja: 'Prompt Generator', en: 'Prompt Generator' },
    subtitle: {
      ja: 'AIとの対話を最適化する、高品質なメタプロンプトを作成します。',
      en: 'Create high-quality meta-prompts optimized for AI interactions.'
    },
    configure: { ja: 'プロンプト設定', en: 'Configure Prompt' },
    goalLabel: { ja: '目的を選択', en: 'What is your Goal?' },
    generateBtn: { ja: 'メタプロンプトを生成', en: 'Generate Meta-Prompt' },
    vibeLabel: { ja: 'Vibe Coding モード 🚀', en: 'Vibe Coding Mode 🚀' }
  };

  // Derive current template
  const currentTemplate = useMemo(() =>
    PROMPT_TEMPLATES.find(t => t.id === selectedTemplateId) || PROMPT_TEMPLATES[0]
    , [selectedTemplateId]);

  // Handle template change
  const handleTemplateChange = (newId: string) => {
    setSelectedTemplateId(newId);
    setFormData({}); // Reset form
    setResult('');

    // Update Vibe Default
    const template = PROMPT_TEMPLATES.find(t => t.id === newId);
    if (template) {
      setIsVibeCoding(template.vibeCodingDefault);
    }
  };

  const handleFieldChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = () => {
    const prompt = generateMetaPrompt(currentTemplate, formData, isVibeCoding, lang);
    setResult(prompt);
    // Smooth scroll to bottom
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="container" style={{ position: 'relative' }}>
      {/* Language Switcher */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
        <Select
          options={[
            { value: 'ja', label: '日本語' },
            { value: 'en', label: 'English' }
          ]}
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
          style={{ width: 'auto', minWidth: '120px', padding: '0.4rem 1rem' }}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '3rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          {UI_TEXT.title[lang]}
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'hsl(var(--color-text-muted))' }}>
          {UI_TEXT.subtitle[lang]}
        </p>
      </div>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>{UI_TEXT.configure[lang]}</h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <label htmlFor="vibe-toggle" style={{ margin: 0, cursor: 'pointer', color: isVibeCoding ? 'hsl(var(--color-primary))' : 'inherit', fontWeight: isVibeCoding ? 700 : 400 }}>
              {UI_TEXT.vibeLabel[lang]}
            </label>
            <input
              id="vibe-toggle"
              type="checkbox"
              checked={isVibeCoding}
              onChange={(e) => setIsVibeCoding(e.target.checked)}
              style={{ width: '1.2rem', height: '1.2rem', accentColor: 'hsl(var(--color-primary))', cursor: 'pointer' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <Select
            label={UI_TEXT.goalLabel[lang]}
            value={selectedTemplateId}
            onChange={(e) => handleTemplateChange(e.target.value)}
            options={PROMPT_TEMPLATES.map(t => ({ value: t.id, label: t.label[lang] }))}
          />
        </div>

        <div style={{ padding: '1.5rem', background: 'rgba(15, 23, 42, 0.3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'hsl(var(--color-primary))', fontWeight: 500 }}>
            {currentTemplate.description[lang]}
          </p>
          <DynamicForm
            fields={currentTemplate.fields}
            values={formData}
            onChange={handleFieldChange}
            lang={lang}
          />
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
          <Button variant="primary" onClick={handleGenerate} style={{ width: '100%' }}>
            {UI_TEXT.generateBtn[lang]}
          </Button>
        </div>
      </Card>

      <PromptPreview prompt={result} />

      <div style={{ height: '3rem' }}></div>
    </div>
  );
}

export default App;
