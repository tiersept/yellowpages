"use client";

import { User } from "@repo/db";
import { UserListItem } from "./user-list-item";
import { CardM } from "@repo/ui/card/index";
import { AnimatePresence } from "motion/react";
import { useLayoutNavigation } from "../../hooks/use-layout-navigation";
import { DEFAULT_SPRING } from "@repo/ui/constants/animation";
import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@repo/utils";

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  const { isOpen, pushToUserPage, animatingId, setAnimatingId } =
    useLayoutNavigation();

  useEffect(() => {
    setAnimatingId(null);
  }, []);

  return (
    <AnimatePresence>
      {!isOpen ? (
        <>
          <CardM
            layoutId="card-modal"
            transition={DEFAULT_SPRING}
            className="absolute w-full h-[calc(100dvh-3rem)] flex flex-col"
          />
          <ul
            className={cn(
              "relative flex flex-col overflow-y-auto overflow-x-hidden py-2 px-2 h-[calc(100dvh-3rem)]",
              !!animatingId
                ? "scrollbar-none"
                : "scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
            )}
            role="list"
          >
            {users.map((user) => {
              const company = user.company as { name: string };
              return (
                <li key={user.id} role="none">
                  <Link
                    href={`/user/${user.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      pushToUserPage(user.id);
                    }}
                    aria-label={`View profile for ${user.name} from ${company.name}`}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl"
                  >
                    <UserListItem
                      user={user}
                      shouldAnimateOut={
                        !!animatingId && animatingId !== user.id
                      }
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </AnimatePresence>
  );
};
