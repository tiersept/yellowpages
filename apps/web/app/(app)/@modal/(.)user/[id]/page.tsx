import { prisma } from "@repo/db";
import { notFound } from "next/navigation";
import { Modal } from "../../../../../components/modal";
import { motion } from "../../../../../components/motion";
import { DEFAULT_SPRING } from "@repo/ui/constants/animation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = parseInt(id, 10);

  if (isNaN(userId)) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    notFound();
  }

  const company = user.company as {
    name: string;
    catchPhrase: string;
    bs: string;
  };

  const address = user.address as {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };

  return (
    <Modal>
      <div className="flex items-center gap-6 mb-6">
        {user.avatar && (
          <motion.img
            layoutId={`user-avatar-${user.id}`}
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div>
          <motion.h1
            layoutId={`user-name-${user.id}`}
            layout="position"
            className="text-3xl font-bold mb-2"
          >
            {user.name}
          </motion.h1>
          <motion.p
            layoutId={`company-name-${user.id}`}
            layout="position"
            className="text-lg opacity-70"
          >
            {company.name}
          </motion.p>
          <p className="text-sm opacity-50 italic">{company.catchPhrase}</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.42 } }}
        transition={DEFAULT_SPRING}
        className="space-y-4 mb-6"
      >
        <div>
          <h2 className="text-sm font-semibold opacity-70 mb-1">Contact</h2>
          <p className="text-sm">{user.email}</p>
          <p className="text-sm">{user.phone}</p>
          <a
            href={user.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            {user.website}
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold opacity-70 mb-1">Address</h2>
          <p className="text-sm">
            {address.street}, {address.suite}
          </p>
          <p className="text-sm">
            {address.city}, {address.zipcode}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold opacity-70 mb-2">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 text-sm bg-neutral-700/50 rounded text-neutral-300"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}
