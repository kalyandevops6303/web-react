import React from 'react';
import Styles from '@flexternships/styles/components/core/tags.module.css';

export default function PrimaryTag({ content, className }: Props) {
  return (
    <span className={`${Styles.primaryTag} ${Styles.tag} ${className ?? ''}`}>
      {content}
    </span>
  )
}

type Props = {
  content: string
  className?: string
};