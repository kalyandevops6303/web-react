// Parent should be a client component for this to work

import React from 'react';
import Styles from '@flexternships/styles/components/core/buttons.module.css';
import Spinner from '../Spinner';

export default function PrimaryButton(props: ButtonProps) {
  const { children, onClick, disabled, className, loading } = props;

  return (
    <button
      onClick={onClick}
      className={`${Styles.baseButton} ${
        disabled || loading ? Styles.primaryDisabledButton : Styles.primaryEnabledButton
      } ${className ?? ''}`}
      disabled={(disabled || loading) ?? false}
    >
      {loading ? <Spinner white={true} /> : children}
    </button>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // onClick handler with event type
  disabled?: boolean;
  className?: string;
  loading?: boolean;
};
