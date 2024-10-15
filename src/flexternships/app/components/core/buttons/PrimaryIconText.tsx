import React from 'react';
import Styles from '@flexternships/styles/components/core/buttons.module.css'

export default function PrimaryIconText(props: Props) {
    const { text, onClick, icon, bgDark=false, className } = props;
    return (
        <button className={`${Styles.primaryIconText} ${className ?? ''}`} onClick={onClick}>
            {
                icon && (
                    <span className={`${Styles.iconContainer} ${bgDark?'bg-trublue-secondary-500':'bg-trublue-light'}`}>
                        {icon}
                    </span>
                )
            }
            <span className={Styles.text}>
                {text}
            </span>
        </button>
    );
}

type Props = {
    text: string
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // onClick handler with event type
    icon?: React.ReactNode
    bgDark?: boolean
    className?: string
};