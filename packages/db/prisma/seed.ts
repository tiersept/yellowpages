import { faker } from "@faker-js/faker";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { prisma } from "../src";

const __filename = fileURLToPath(import.meta.url);
const rootDir = resolve(dirname(__filename), "..", "..", "..");
config({ path: resolve(rootDir, ".env") });

const BATCH_SIZE = 500;
const USER_COUNT = parseInt(process.env.SEED_USER_COUNT || "100", 10);

const INTERESTS = [
  "coding",
  "reading",
  "hiking",
  "photography",
  "cooking",
  "traveling",
  "music",
  "gaming",
  "sports",
  "art",
  "writing",
  "yoga",
  "dancing",
  "gardening",
  "fishing",
  "cycling",
  "swimming",
  "movies",
  "puzzles",
  "volunteering",
];

function generateUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet
    .username({ firstName, lastName })
    .toLowerCase();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();

  return {
    name: `${firstName} ${lastName}`,
    username,
    email,
    avatar: faker.image.avatar(),
    address: {
      street: faker.location.streetAddress(),
      suite: faker.location.secondaryAddress(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      geo: {
        lat: faker.location.latitude().toString(),
        lng: faker.location.longitude().toString(),
      },
    },
    phone: faker.phone.number(),
    website: faker.internet.url(),
    company: {
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.buzzPhrase(),
    },
    interests: faker.helpers.arrayElements(INTERESTS, {
      min: 2,
      max: 6,
    }),
  };
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  console.log("Clearing existing users...");
  await prisma.user.deleteMany();

  console.log(`Generating ${USER_COUNT} users...`);
  const users = Array.from({ length: USER_COUNT }, () => generateUser());

  console.log(`Seeding users in batches of ${BATCH_SIZE}...`);
  let seededCount = 0;

  await prisma.$transaction(async (tx) => {
    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      const batch = users.slice(i, i + BATCH_SIZE);
      const result = await tx.user.createMany({
        data: batch,
        skipDuplicates: true,
      });
      seededCount += result.count;
      console.log(
        `  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(users.length / BATCH_SIZE)}: ${result.count} users created`
      );
    }
  });

  console.log(`✅ Seeded ${seededCount} users successfully!`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
