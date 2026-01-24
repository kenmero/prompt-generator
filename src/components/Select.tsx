import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, id, options, className = '', ...props }) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={id} className="label">{label}</label>}
            <select
                id={id}
                className={`select-field ${className}`}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
