"use client";

import { signOut } from "next-auth/react";

function Users() {
  return <button onClick={() => signOut()}>Logout</button>;
}

export default Users;
