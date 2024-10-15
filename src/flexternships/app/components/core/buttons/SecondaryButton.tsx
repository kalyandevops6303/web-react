// Parent should be a client component for this to work

import React from 'react';
import Styles from '@flexternships/styles/components/core/buttons.module.css';
import Spinner from '../Spinner';

export default function SecondaryButton(props: ButtonProps) {
    const { text, onClick, loading=false, disabled, className, cancel=false } = props;

    return (
        <button onClick={onClick} className={`${Styles.baseButton} ${disabled ? Styles.secondaryDisabledButton : cancel ? Styles.secondaryEnabledButtonRed : Styles.secondaryEnabledButtonBlue} ${className || ""}`}>
            {
                loading?(<Spinner/>):(
                    text ?? 'Button'
                )
            }
        </button>
    );
}

type ButtonProps = {
    text: string
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // onClick handler with event type
    loading?: boolean
    disabled?: boolean
    className?: string
    cancel?: boolean
};