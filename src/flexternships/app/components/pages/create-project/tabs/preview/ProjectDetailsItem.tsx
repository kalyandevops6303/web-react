import React from 'react';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';

export default function ProjectDetailsItem(props: Props) {
    const { title, value, greymatter, className } = props;
    return (
        <div className={`${Styles.projectDetailsItem} ${className ?? ''}`}>
            <div className={Styles.projectDetailsItemValueContainer}>
                <span className={Styles.projectDetailsItemValue}>
                    {value}
                </span>{' '}
                <span className={Styles.projectDetailsItemGreymatter}>
                    {greymatter}
                </span>
            </div>
            <div className={Styles.projectDetailsItemTitle}>
                {title}
            </div>
        </div>
    );
}


type Props = {
    title: string
    value: string
    greymatter?: string
    className?: string
}