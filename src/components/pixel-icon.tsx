import { cn } from "@/lib/utils";

type PixelIconProps = {
  name: string;
  className?: string;
  solid?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "className">;

export function PixelIcon({
  name,
  className,
  solid = false,
  ...props
}: PixelIconProps) {
  return (
    <i
      className={cn("hn", `hn-${name}`, solid && `hn-${name}-solid`, className)}
      aria-hidden="true"
      {...props}
    />
  );
}
