import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
    return (
        <div className={`glass-panel p-6 ${className}`} style={{ padding: '1.5rem', ...style }}>
            {children}
        </div>
    );
};
