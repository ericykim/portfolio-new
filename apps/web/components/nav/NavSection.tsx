import Link from "next/link";
import { Button, cn } from "@heroui/react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface NavSectionProps {
  items: NavItem[];
  currentPath: string;
  title?: string;
  className?: string;
}

export function NavSection({
  items,
  currentPath,
  title,
  className,
}: NavSectionProps) {
  return (
    <div className={cn("space-y-0.5", className)}>
      {title && (
        <div className="px-2 mb-1">
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
            {title}
          </p>
        </div>
      )}

      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          currentPath === item.href ||
          (item.href !== "/" && currentPath.startsWith(item.href + "/"));

        return (
          <Button
            key={item.href}
            as={Link}
            href={item.href}
            variant="light"
            className={cn(
              "flex items-center justify-start gap-2.5 h-auto min-h-0 px-2 py-1.5 w-full",
              "text-sm font-medium whitespace-nowrap",
              "data-[hover=true]:bg-neutral-100 dark:data-[hover=true]:bg-neutral-900/70",
              "data-[pressed=true]:scale-[0.98]",
              isActive
                ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold"
                : "text-neutral-600 dark:text-neutral-400 data-[hover=true]:text-neutral-900 dark:data-[hover=true]:text-neutral-100"
            )}
          >
            <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
            <span>{item.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
