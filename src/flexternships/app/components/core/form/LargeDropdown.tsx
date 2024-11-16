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
        <DropdownMenuContent className="w-56 bg-white p-0 rounded" side="bottom" align="start">
          <DropdownMenuRadioGroup>
            {options?.map((option) => (
              <DropdownMenuItem onClick={() => setSelected(option)} className="hover:bg-[#0185E433] p-0">
                {option?.value === selected?.value ? (
                  <span className="text-[12px] font-montserrat font-normal leading-[20px] text-white bg-[#0185E4] p-2 w-full m-0">
                    {option?.displayText}
                  </span>
                ) : (
                  <span className="text-[12px] font-montserrat font-normal leading-[20px] p-2 text-[#6A7071]">
                    {option?.displayText}
                  </span>
                )}
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
