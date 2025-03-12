// Parent should be a client component for this to work

import React from 'react';
import Styles from '@flexternships/styles/components/core/buttons.module.css';
import Spinner from '../Spinner';
import classNames from 'classnames';

export default function SecondaryButton(props: ButtonProps) {
  const { children, onClick, loading = false, disabled, className, cancel = false } = props;

  const isDisabled = disabled || loading;

  const getButtonStyle = () => {
    if (isDisabled && cancel) return Styles.secondaryDisabledButtonRed;
    if (isDisabled) return Styles.secondaryDisabledButtonBlue;
    if (cancel) return Styles.secondaryEnabledButtonRed;
    return Styles.secondaryEnabledButtonBlue;
  };

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${Styles.baseButton} ${getButtonStyle()} ${className || ''}`}
    >
      {loading ? <Spinner className={classNames({ 'border-error': cancel })} /> : children}
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
