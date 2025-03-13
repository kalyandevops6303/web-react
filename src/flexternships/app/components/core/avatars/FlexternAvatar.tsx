import { Avatar, AvatarImage, AvatarFallback } from '@/flexternships/app/components/ui/avatar';
import { cn } from '@/flexternships/lib/utils';
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';

const style = {
  sm: 'text-md',
  md: 'text-lg',
  lg: 'text-2xl',
};

export default function FlexternAvatar({ imageUri, name, className, size = 'md' }: FlexternAvatarProps) {
  return (
    <Avatar className={`${className}`}>
      <AvatarImage src={imageUri} className={`${className}`} />
      <AvatarFallback
        className={cn('p-2 leading-6 font-semibold text-lg', className)}
        style={{
          color: stringToColour(name),
          backgroundColor: `${stringToColour(name, {
            opacity: 10,
          })}`,
          width: `${size === 'sm' ? '20px' : size === 'md' ? '40px' : '120px'}`,
          height: `${size === 'sm' ? '20px' : size === 'md' ? '40px' : '120px'}`,
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
  size?: 'sm' | 'md' | 'lg';
};
