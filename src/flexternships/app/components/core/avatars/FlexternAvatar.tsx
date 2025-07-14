import { Avatar, AvatarImage, AvatarFallback } from '@/flexternships/app/components/ui/avatar';
import { cn } from '@/flexternships/lib/utils';
import { useAppStore } from '@/flexternships/stores/core-stores';
import { stringToColour, addQueryParams } from '@/flexternships/utils/miscellaneous-utils';

const style = {
  sm: 'text-md',
  md: 'text-lg',
  lg: 'text-2xl',
};

const sizeMap = {
  sm: '20px',
  md: '40px',
  lg: '120px',
};

export default function FlexternAvatar({
  imageUri,
  name,
  className,
  useSasToken = true,
  size = 'md',
}: FlexternAvatarProps) {
  const blobSasTokenParams = useAppStore((state) => state.blobSasTokenParams);
  const imageUriAdjustedForSasToken = useSasToken ? addQueryParams(imageUri, blobSasTokenParams) : imageUri;

  return (
    <Avatar className={className}>
      <AvatarImage src={imageUriAdjustedForSasToken} className={cn(className, 'object-cover')} />
      <AvatarFallback
        className={cn('p-2 leading-6 font-semibold text-lg', className)}
        style={{
          color: stringToColour(name),
          backgroundColor: `${stringToColour(name, {
            opacity: 10,
          })}`,
          width: `${sizeMap[size]}`,
          height: `${sizeMap[size]}`,
        }}
      >
        <span className={cn(style[size])}>
          {name
            .split(' ')
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join('')}
        </span>
      </AvatarFallback>
    </Avatar>
  );
}

type FlexternAvatarProps = {
  imageUri?: string;
  name: string;
  className?: string;
  useSasToken?: boolean;
  size?: 'sm' | 'md' | 'lg';
};
