"use client";

import { User } from "@repo/db";
import { ListItem } from "@repo/ui/list-item/index";
import { motion } from "../motion";
import { DEFAULT_SPRING } from "@repo/ui/constants/animation";

export const UserListItem = ({
  user,
  shouldAnimateOut,
}: {
  user: User;
  shouldAnimateOut: boolean;
}) => {
  const company = user.company as { name: string };
  const nameId = `user-name-${user.id}`;
  const companyId = `company-name-${user.id}`;

  return (
    <ListItem className={shouldAnimateOut ? "opacity-0 group" : "group"}>
      <article
        aria-labelledby={nameId}
        aria-describedby={companyId}
        className="contents"
      >
        <div className="flex items-center gap-4 mb-3">
          {user.avatar && (
            <motion.img
              layoutId={`user-avatar-${user.id}`}
              transition={DEFAULT_SPRING}
              layout="position"
              src={user.avatar}
              alt={`${user.name}'s profile picture`}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <motion.h2
              id={nameId}
              layoutId={nameId}
              transition={DEFAULT_SPRING}
              layout="position"
              className="text-lg font-semibold mb-0.5 ui:group-hover:text-blue-500 transition-colors"
            >
              {user.name}
            </motion.h2>
            <motion.p
              id={companyId}
              layoutId={companyId}
              transition={DEFAULT_SPRING}
              layout="position"
              className="text-sm opacity-70"
            >
              {company.name}
            </motion.p>
          </div>
        </div>
      </article>
    </ListItem>
  );
};
