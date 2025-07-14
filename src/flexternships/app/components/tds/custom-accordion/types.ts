export enum AccordionType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

type AccordionBaseProps = {
  type?: AccordionType;
  collapsible?: boolean;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

type SingleAccordionProps = {
  type?: AccordionType.SINGLE;
  section: {
    value: string;
    trigger: React.ReactNode;
    content: React.ReactNode;
  };
} & AccordionBaseProps;

type MultipleAccordionProps = {
  type?: AccordionType.MULTIPLE;
  sections: {
    value: string;
    trigger: React.ReactNode;
    content: React.ReactNode;
  }[];
} & AccordionBaseProps;

type CustomAccordionProps = SingleAccordionProps | MultipleAccordionProps;

export type { AccordionBaseProps, SingleAccordionProps, MultipleAccordionProps, CustomAccordionProps };
