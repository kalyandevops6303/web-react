import { Info } from 'react-feather';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/flexternships/app/components/ui/tooltip';

interface TooltipInfoProps {
  children: React.ReactNode;
  iconSize?: number;
  trigger?: React.ReactNode | string;
}

export default function TooltipInfo({ children, iconSize = 12, trigger }: TooltipInfoProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {trigger || <Info size={iconSize} color="#5E5873" className="cursor-pointer" />}
        </TooltipTrigger>
        <TooltipContent className="bg-[#323232] text-white font-montserrat text-xs font-normal leading-none tracking-wider">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
