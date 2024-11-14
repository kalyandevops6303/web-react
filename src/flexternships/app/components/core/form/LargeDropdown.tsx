import { useEffect, useState } from 'react';
import { ChevronDown } from 'react-feather';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from '@flexternships/components/ui/dropdown-menu';

export default function LargeDropdown(props: LargeDropdownProps) {
  const { defaultSelected, options, onChange, formatSelected } = props;

  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    onChange(selected?.value);
  }, [selected]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="text-[20px] leading-[28px] font-[600] font-[Montserrat] text-[#0185E4] flex gap-1 items-center cursor-pointer border-bottom border-[#0185E4]">
            <div>{formatSelected ? formatSelected(selected) : selected?.displayText}</div>
            <div>
              <ChevronDown />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white">
          <DropdownMenuRadioGroup>
            {options?.map((option) => (
              <DropdownMenuItem onClick={() => setSelected(option)} className="hover:bg-primary">
                {option?.displayText}
              </DropdownMenuItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type LargeDropdownProps = {
  defaultSelected: {
    displayText: string;
    value: any;
  };
  options: {
    displayText: string;
    value: any;
  }[];
  onChange: (selected: any) => void;
  formatSelected?: (selected: any) => string;
};
