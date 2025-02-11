import { Avatar, AvatarImage, AvatarFallback } from '@/flexternships/app/components/ui/avatar';
import { cn } from '@/flexternships/lib/utils';
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';

export default function FlexternAvatar({ imageUri, name, className }: FlexternAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={imageUri} />
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
};
