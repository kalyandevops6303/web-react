import { cn } from '@/lib/utils';
import React, { useState } from 'react';

type ExpandableTextProps = {
  children: React.ReactNode;
  className?: string;
  charLimit?: number;
};

export default function ExpandableText(props: ExpandableTextProps) {
  const { children, className, charLimit = 100 } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const text = children?.toString() || '';
  const shouldTruncate = text.length > charLimit;
  const displayText = shouldTruncate && !isExpanded ? text.slice(0, charLimit).trim() + '...' : text;

  return (
    <span className={cn('text-sm font-normal leading-5.5 text-grey', className)}>
      {displayText}
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-1 text-trublue-secondary-500 text-sm font-normal leading-5.5 hover:underline"
        >
          {isExpanded ? 'read less' : 'read more'}
        </button>
      )}
    </span>
  );
}
