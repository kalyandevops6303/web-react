import React from 'react';
import Styles from '@flexternships/styles/components/core/cards.module.css';

export default function SimpleElevatedCard(props: CardProps) {
  const { children, className, ...rest } = props;

  return (
    <div className={`${Styles.simpleElevatedCard} ${className ?? ''}`} {...rest}>
      {children}
    </div>
  );
}

type CardProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
