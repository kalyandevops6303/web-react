import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { CustomCheck, CustomX, CustomSearch } from '../../../assets/icons';
import { CheckIcon, XIcon, SearchIcon } from 'lucide-react';
import { Input } from '../../ui/input';
import Spinner from '../Spinner';
export interface Option {
  label: string;
  value: string;
}

export interface DropdownProps {
  label?: string;
  options: Option[];
  width?: string;
  placeholder?: string;
  labelClassName?: string;
  className?: string;
  optionStyle?: string;
  multi?: boolean;
  searchable?: boolean;
  paginated?: boolean;
  loading?: boolean;
  selected?: Option | Option[] | null;
  onChange?: (selected: Option | Option[] | null) => void;
  onLoadMore?: () => void;
  onSearch?: (query: string) => void;
  required?: boolean;
  rank?: { label: string; value: string };
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label = 'Dropdown',
  options,
  placeholder = 'Select an option',
  multi = false,
  searchable = false,
  paginated = false,
  loading = false,
  selected,
  width = 'min-w-[200px]',
  labelClassName,
  className,
  optionStyle,
  onChange,
  onLoadMore,
  onSearch,
  required = false,
  rank,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<Option[] | Option | null>(multi ? [] : null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayedOptions, setDisplayedOptions] = useState<Option[]>(options);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const scrollTriggeredRef = useRef(false);

  const isControlled = selected !== undefined;
  const currentValue = isControlled ? selected : internalSelected;

  useEffect(() => {
    setDisplayedOptions(options);
  }, [options]);

  const handleSelect = (option: Option) => {
    if (multi) {
      const selectedList = Array.isArray(currentValue) ? [...currentValue] : [];
      const exists = selectedList.find((item) => item.value === option.value);
      const updated = exists ? selectedList.filter((item) => item.value !== option.value) : [...selectedList, option];

      if (!isControlled) {
        setInternalSelected(updated);
      }
      onChange?.(updated);
    } else {
      const current = currentValue as Option | null;
      const isSame = current?.value === option.value;
      const updated = isSame ? null : option;

      if (!isControlled) {
        setInternalSelected(updated);
      }
      onChange?.(updated);
      if (!multi) setIsOpen(false);
    }
  };

  const removeOption = (option: Option) => {
    if (multi && Array.isArray(currentValue)) {
      const updated = currentValue.filter((item) => item.value !== option.value);
      if (!isControlled) setInternalSelected(updated);
      onChange?.(updated);
    } else {
      if (!isControlled) setInternalSelected(null);
      onChange?.(null);
    }
  };

  const isSelected = (option: Option) => {
    if (multi && Array.isArray(currentValue)) {
      return currentValue.some((item) => item.value === option.value);
    }
    return (currentValue as Option)?.value === option.value;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    // Call onSearch callback if provided
    onSearch?.(value);

    if (!value) {
      setDisplayedOptions(options);
      return;
    }

    const filtered = options.filter(
      (option) => option.label.toLowerCase().includes(value) || option.value.toLowerCase().includes(value),
    );
    setDisplayedOptions(filtered);
  };

  // Reset scroll triggered ref when options change or loading state changes
  useEffect(() => {
    scrollTriggeredRef.current = false;
  }, [options, loading]);

  const handleScroll = useCallback(() => {
    if (!paginated || !onLoadMore || loading || scrollTriggeredRef.current) return;

    const optionsElement = optionsRef.current;
    if (!optionsElement) return;

    const { scrollTop, scrollHeight, clientHeight } = optionsElement;
    const scrolledToBottom = scrollHeight - scrollTop <= clientHeight + 50; // Increased threshold

    // Check if user has scrolled close to the bottom
    if (scrolledToBottom) {
      scrollTriggeredRef.current = true; // Prevent multiple calls until the next load completes
      onLoadMore();
    }
  }, [paginated, onLoadMore, loading]);

  // Add scroll event listener when dropdown is open
  useEffect(() => {
    const optionsElement = optionsRef.current;
    if (optionsElement && paginated && isOpen) {
      optionsElement.addEventListener('scroll', handleScroll);

      // Initial check in case the content doesn't fill the container
      setTimeout(() => {
        if (optionsElement.scrollHeight <= optionsElement.clientHeight && !loading && paginated && onLoadMore) {
          onLoadMore();
        }
      }, 100);

      return () => {
        optionsElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [paginated, handleScroll, isOpen, loading, onLoadMore]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${width}`} ref={containerRef}>
      {label && (
        <label className={`text-xs text-body-text font-Montserrat mb-[5px] ${labelClassName || ''}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        onClick={() => (disabled ? setIsOpen(false) : setIsOpen(!isOpen))}
        className={`${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        } bg-white flex flex-row gap-[1px] items-center border border-border-input rounded-[6px] ${className} relative`}
      >
        {multi ? (
          Array.isArray(currentValue) && currentValue.length > 0 ? (
            currentValue.map((item) => (
              <div
                key={item.value}
                className={`flex flex-row overflow-hidden items-center bg-[#4DAAEC] text-white text-xs rounded-[3px] whitespace-nowrap`}
              >
                {item.label}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(item);
                  }}
                  className="ml-1 text-[10px] font-bold"
                >
                  <XIcon width={12} height={12} color="white" />
                </button>
              </div>
            ))
          ) : (
            <span className="text-xs text-gray-400">{placeholder}</span>
          )
        ) : (currentValue as Option)?.label ? (
          <div
            className={`flex items-center ${
              multi ? 'bg-[#4DAAEC] text-white' : 'text-[#515759]'
            }  text-xs px-2 py-1 rounded-[3px]`}
          >
            {(currentValue as Option).label}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeOption(currentValue as Option);
              }}
              className="ml-1 text-[10px] font-bold"
            >
              {multi && <XIcon width={12} height={12} color="white" />}
            </button>
          </div>
        ) : (
          <span className="text-xs text-gray-400">{placeholder}</span>
        )}
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="#6E6B7B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {rank && (
          <div className="text-xs text-primary-500 border border-primary-500 rounded-full px-2 py-1 bg-primary-500/10 mr-10">
            <p className="font-semibold ">
              Rank: {rank.label}/{rank.value}
            </p>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute z-10 mt-2 bg-white border border-gray-300 rounded-md w-full ${optionStyle} shadow-lg [filter:drop-shadow(0px_5px_25px_rgba(0,0,0,0.10))]`}
          style={{ maxHeight: '300px', display: 'flex', flexDirection: 'column' }}
        >
          {searchable && (
            <div
              className="sticky top-0 z-20 bg-white p-2 border-b border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="   Search..."
                  className="pl-8 pr-2 py-1 w-full text-sm"
                />
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <SearchIcon width={16} height={16} color="#6E6B7B" />
                </span>
              </div>
            </div>
          )}
          <div
            ref={optionsRef}
            className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            style={{ overflowY: 'auto', maxHeight: searchable ? 'calc(300px - 50px)' : '300px' }}
            onScroll={paginated ? handleScroll : undefined}
          >
            {displayedOptions.length > 0 ? (
              displayedOptions.map((option) => {
                const selected = isSelected(option);
                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`px-[18px] py-2 cursor-pointer flex items-center justify-between gap-2 ${
                      selected ? 'bg-option-bg' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={`text-sm font-Montserrat ${selected ? 'text-secondary-500 ' : 'text-body-text'}`}>
                      {option.label}
                    </span>

                    {selected && <CheckIcon height={16} width={16} color="#0185E4" />}
                  </div>
                );
              })
            ) : (
              <div className="px-[18px] py-2 text-sm text-gray-400">No options found</div>
            )}
            {loading && (
              <div className="p-2 flex justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
