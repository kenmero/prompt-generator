import React from 'react';
import type { PromptField, Language } from '../lib/promptConfig';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';

interface DynamicFormProps {
    fields: PromptField[];
    values: Record<string, string>;
    onChange: (id: string, value: string) => void;
    lang: Language;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ fields, values, onChange, lang }) => {
    return (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
            {fields.map((field) => {
                const value = values[field.id] || field.defaultValue || '';
                const labelText = field.label[lang];
                const placeholderText = field.placeholder ? field.placeholder[lang] : '';

                if (field.type === 'select' && field.options) {
                    const options = field.options.map(opt => ({
                        value: opt.value,
                        label: opt.label[lang]
                    }));

                    return (
                        <Select
                            key={field.id}
                            id={field.id}
                            label={labelText}
                            value={value}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(field.id, e.target.value)}
                            options={options}
                        />
                    );
                }

                if (field.type === 'textarea') {
                    return (
                        <Textarea
                            key={field.id}
                            id={field.id}
                            label={labelText}
                            placeholder={placeholderText}
                            value={value}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(field.id, e.target.value)}
                        />
                    );
                }

                return (
                    <Input
                        key={field.id}
                        id={field.id}
                        label={labelText}
                        placeholder={placeholderText}
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(field.id, e.target.value)}
                    />
                );
            })}
        </div>
    );
};
