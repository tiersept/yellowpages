import { prisma } from "@repo/db";
import { UserList } from "./user-list";

export const UserListServer = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const users = await prisma.user.findMany();

  return <UserList users={users} />;
};
