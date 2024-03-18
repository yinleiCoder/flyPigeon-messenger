"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

function Header({ conversation }: HeaderProps) {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length}位成员在线`;
    }
    return "在线";
  }, [conversation]);

  return (
    <div className="w-full bg-white flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          href="/conversations"
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
        >
          <HiChevronLeft size={24} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div className="font-semibold">
            {conversation.name || otherUser.name}
          </div>
          <div className="text-xs font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
      />
    </div>
  );
}

export default Header;
