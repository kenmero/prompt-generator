import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className = '', ...props }) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={id} className="label">{label}</label>}
            <input
                id={id}
                className={`input-field ${className}`}
                {...props}
            />
        </div>
    );
};
