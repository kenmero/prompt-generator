import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, className = '', ...props }) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={id} className="label">{label}</label>}
            <textarea
                id={id}
                className={`textarea-field ${className}`}
                {...props}
            />
        </div>
    );
};
