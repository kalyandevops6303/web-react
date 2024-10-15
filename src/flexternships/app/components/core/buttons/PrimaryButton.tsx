// Parent should be a client component for this to work

import React from 'react';
import Styles from '@flexternships/styles/components/core/buttons.module.css';

export default function PrimaryButton(props: ButtonProps) {
    const { children, onClick, disabled, className } = props;

    return (
        <button onClick={onClick} className={`${Styles.baseButton} ${disabled ? Styles.primaryDisabledButton : Styles.primaryEnabledButton} ${className ?? ''}`} disabled={disabled ?? false}>
            {children}
        </button>
    );
}

type ButtonProps = {
    children: React.ReactNode
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // onClick handler with event type
    disabled?: boolean
    className?: string
};