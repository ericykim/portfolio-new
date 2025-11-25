import Link from "next/link";
import { cn } from "@heroui/react";

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
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 px-2 py-1.5 rounded-md",
              "text-sm font-medium whitespace-nowrap",
              "transition-colors duration-150 ease-in-out",
              isActive
                ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-neutral-100"
            )}
          >
            <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
