import { useEffect, useState } from 'react';
import { ChevronDown } from 'react-feather';
import SimpleElevatedCard from '../cards/SimpleElevatedCard';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@flexternships/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function LargeDropdown(props: LargeDropdownProps) {
  const { defaultSelected, options, onChange } = props;

  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    console.log(selected?.value);
    onChange(selected?.value);
  }, [selected]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="text-[20px] leading-[28px] font-[600] font-[Montserrat] text-[#0185E4] flex gap-1 items-center cursor-pointer border-bottom border-[#0185E4]">
            <div>{selected?.displayText}</div>
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
};
