import { Avatar, AvatarImage, AvatarFallback } from '@/flexternships/app/components/ui/avatar';
import { cn } from '@/flexternships/lib/utils';
import { useAppStore } from '@/flexternships/stores/core-stores';
import { stringToColour, addQueryParams } from '@/flexternships/utils/miscellaneous-utils';

export default function FlexternAvatar({ imageUri, name, className, useSasToken = true }: FlexternAvatarProps) {
  const blobSasTokenParams = useAppStore((state) => state.blobSasTokenParams);
  const imageUriAdjustedForSasToken = useSasToken ? addQueryParams(imageUri, blobSasTokenParams) : imageUri;

  return (
    <Avatar>
      <AvatarImage src={imageUriAdjustedForSasToken} />
      <AvatarFallback
        className={cn('p-2 leading-6 font-semibold text-lg', className)}
        style={{
          color: stringToColour(name),
          backgroundColor: `${stringToColour(name, {
            opacity: 10,
          })}`,
        }}
      >
        {name
          .split(' ')
          .slice(0, 2)
          .map((word) => word.charAt(0).toUpperCase())
          .join('')}
      </AvatarFallback>
    </Avatar>
  );
}

type FlexternAvatarProps = {
  imageUri?: string;
  name: string;
  className?: string;
  useSasToken?: boolean;
};
