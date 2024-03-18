"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}

function Avatar({ user }: AvatarProps) {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-8 w-8 md:h-8 md:w-8">
        <Image
          alt={user?.name ?? ""}
          src={user?.image || "/images/userDefaultAvatar.png"}
          fill
          priority
        />
      </div>
      <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-1.5 w-1.5 md:h-2 md:w-2" />
    </div>
  );
}

export default Avatar;
