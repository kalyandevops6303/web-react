import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@flexternships/components/ui/accordion';

import Styles from '@flexternships/styles/components/core/cards.module.css';
import React from 'react';

export default function CollapsableCard(props: CollapsableCardProps) {
  const { children, isCollapsible, bordered, isOpen, headerContent, className, white } = props;

  return (
    <Accordion
      defaultValue={isOpen ? 'item-1' : ''}
      type="single"
      collapsible={isCollapsible || true}
      className={`w-full hover:no-underline ${
        bordered && 'rounded-[6px] border border-[#0578FB] bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]'
      } ${className}`}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className={`${Styles.collapsableCard} hover:no-underline ${white && 'bg-white'}`}>
          {headerContent}
        </AccordionTrigger>
        <AccordionContent data-state={isOpen}>{children}</AccordionContent>
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
};
