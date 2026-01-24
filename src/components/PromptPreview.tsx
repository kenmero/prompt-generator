import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';

interface PromptPreviewProps {
    prompt: string;
}

export const PromptPreview: React.FC<PromptPreviewProps> = ({ prompt }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    if (!prompt) return null;

    return (
        <Card className="mt-8" style={{ marginTop: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ borderBottom: 'none' }}>Generated Meta-Prompt</h3>
                <Button variant="secondary" onClick={handleCopy} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                    {copied ? 'Copied! ✨' : 'Copy Response'}
                </Button>
            </div>

            <div
                style={{
                    background: 'rgba(0,0,0,0.3)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    color: 'var(--color-text-main)',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    border: '1px solid var(--glass-border)',
                    maxHeight: '500px',
                    overflowY: 'auto'
                }}
            >
                {prompt}
            </div>
        </Card>
    );
};
