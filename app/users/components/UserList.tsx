"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

function UserList({ items }: UserListProps) {
  return (
    <aside className="fixed left-0 inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full">
      <div className="px-5">
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">
            社区大家庭
          </div>
        </div>
        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
}

export default UserList;
