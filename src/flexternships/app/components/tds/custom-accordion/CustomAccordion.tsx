import classNames from 'classnames';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/flexternships/app/components/ui/accordion';
import { CustomAccordionProps, AccordionType } from './types';

export const CustomAccordion: React.FC<CustomAccordionProps> = ({
  type = AccordionType.SINGLE,
  collapsible = true,
  itemClassName = 'w-full p-5 border-0',
  triggerClassName = 'w-full p-5 hover:no-underline',
  contentClassName = 'w-full p-5',
  ...rest
}) => {
  const renderItem = (value: string, trigger: React.ReactNode, content: React.ReactNode) => (
    <AccordionItem
      key={value}
      value={value}
      className={classNames(itemClassName, {
        'first:border-0 border-t border-t-secondary': type === 'multiple' && collapsible,
      })}
    >
      <AccordionTrigger className={triggerClassName}>{trigger}</AccordionTrigger>
      <AccordionContent className={contentClassName}>{content}</AccordionContent>
    </AccordionItem>
  );

  const sections = 'sections' in rest ? rest.sections : [rest.section];

  return (
    <Accordion
      type={type}
      collapsible={collapsible}
      className="w-full bg-white shadow-[0px_4px_24px_0px_rgba(0,_0,_0,_0.06)]"
      {...rest}
    >
      <div className="w-full">{sections.map(({ value, trigger, content }) => renderItem(value, trigger, content))}</div>
    </Accordion>
  );
};
