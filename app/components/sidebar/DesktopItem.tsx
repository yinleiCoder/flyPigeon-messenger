"use client";

import Link from "next/link";
import clsx from "clsx";

interface DesktopItemProps {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

function DesktopItem({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: DesktopItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li
      onClick={handleClick}
      className={clsx(
        "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100",
        active && "bg-gray-100 text-black"
      )}
    >
      <Link href={href}>
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}

export default DesktopItem;
