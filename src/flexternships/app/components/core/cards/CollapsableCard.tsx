import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@flexternships/components/ui/accordion';

import Styles from '@flexternships/styles/components/core/cards.module.css';
import { Link } from 'react-router-dom';

export default function CollapsableCard(props: CollapsableCardProps) {
  const { children, isCollapsible, bordered, isOpen, title, subtitle, link } = props;

  return (
    <Accordion
      defaultValue={isOpen ? 'item-1' : ''}
      type="single"
      collapsible={isCollapsible || true}
      className={`w-full hover:no-underline ${
        bordered && 'rounded-[6px] border border-[#0578FB] bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]'
      }`}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className={`${Styles.collapsableCard} hover:no-underline`}>
          <div className="flex w-full items-center mr-3 justify-between">
            <div className="flex flex-col text-left">
              <div className="text-[#B9B9C3] font-sans text-[12px] font-semibold leading-[16px]">{subtitle}</div>
              <div className="text-[#5E5873] font-sans text-[16px] font-medium leading-[24px] !no-underline hover:!no-underline">
                {title}
              </div>
            </div>
            <div>
              <Link
                to={link?.href || '#'}
                className="text-center text-[14px] font-semibold tracking-[0.4px] text-[#0185E4]"
              >
                {link?.text}
              </Link>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent data-state={isOpen}>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

type CollapsableCardProps = {
  children?: React.ReactNode;
  isCollapsible?: boolean;
  title?: string;
  subtitle?: string;
  bordered?: boolean;
  isOpen?: boolean;
  link?: {
    text: string;
    href: string;
  };
};
