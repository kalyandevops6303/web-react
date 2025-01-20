// Parent should be a client component for this to work

import React from 'react';
import Styles from '@flexternships/styles/components/core/buttons.module.css';
import Spinner from '../Spinner';

export default function PrimaryButton(props: ButtonProps) {
  const { children, onClick, loading = false, disabled, className, cancel = false } = props;

  const getButtonStyle = () => {
    if (disabled && cancel) return Styles.primaryDisabledButtonRed;
    if (disabled) return Styles.primaryDisabledButtonBlue;
    if (cancel) return Styles.primaryEnabledButtonRed;
    return Styles.primaryEnabledButtonBlue;
  };

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`${Styles.baseButton} ${getButtonStyle()} ${className || ''}`}
    >
      {loading ? <Spinner className="border-white" /> : children}
    </button>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // onClick handler with event type
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  cancel?: boolean;
};
