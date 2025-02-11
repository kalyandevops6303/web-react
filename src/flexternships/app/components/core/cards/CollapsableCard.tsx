import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@flexternships/components/ui/accordion';

import Styles from '@flexternships/styles/components/core/cards.module.css';
import React, { useState } from 'react';

export default function CollapsableCard(props: CollapsableCardProps) {
  const { children, isCollapsible = true, bordered, isOpen, headerContent, className, white, onToggle } = props;

  const [open, setOpen] = useState(isOpen);

  const handleToggle = () => {
    setOpen(!open);
    onToggle && onToggle();
  };

  return (
    <Accordion
      defaultValue={isOpen ? 'item-1' : ''}
      type="single"
      collapsible={isCollapsible}
      className={cn(
        'w-full hover:no-underline',
        bordered && 'rounded-md border border-[#0578FB] bg-white shadow-card',
        className,
      )}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          className={`${Styles.collapsableCard} hover:no-underline ${white && 'bg-white'} ${
            isCollapsible ? 'cursor-pointer' : 'cursor-default'
          }`}
          onClick={handleToggle}
          hideIcon={!isCollapsible}
        >
          {headerContent}
        </AccordionTrigger>
        <AccordionContent data-state={isOpen} className="border-b-none">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

type CollapsableCardProps = {
  children?: React.ReactNode;
  isCollapsible?: boolean;
  bordered?: boolean;
  isOpen?: boolean;
  headerContent: React.ReactNode;
  className?: string;
  white?: boolean;
  onToggle?: () => void;
};
