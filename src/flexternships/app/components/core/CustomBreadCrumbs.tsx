import { Home } from 'react-feather';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export default function CustomBreadCrumbs(props: CustomBreadCrumbsProps) {
  const { items, startWithHome = true } = props;
  if (items.length < 2) return null;

  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  const middleItems = items.slice(1, items.length - 1);
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm font-medium leading-[21px]">
        {startWithHome && (
          <>
            <BreadcrumbItem className="text-trublue-secondary-500">
              <BreadcrumbLink href={'/'}>
                <Home size={14} />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem className="text-trublue-secondary-500">
          <BreadcrumbLink href={firstItem.href}>{firstItem.label}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {middleItems.length > 0 && (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {middleItems.map((item, index) => (
                    <DropdownMenuItem key={index}>
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-grey-loadingText">{lastItem.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

type CustomBreadCrumbsProps = {
  items: {
    label: string;
    href?: string;
  }[];
  startWithHome?: boolean;
};
