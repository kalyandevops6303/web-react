import { Avatar, AvatarImage, AvatarFallback } from '@/flexternships/app/components/ui/avatar';

export default function FlexternAvatar({
  imageUri,
  firstName,
  lastName,
}: {
  imageUri: string;
  firstName: string;
  lastName: string;
}) {
  return (
    <Avatar>
      <AvatarImage src={imageUri} />
      <AvatarFallback>
        <div className="rounded-full bg-grey-background p-2">
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </div>
      </AvatarFallback>
    </Avatar>
  );
}
