import { prisma } from "@repo/db";
import { MapboxGl } from "../../components/mapbox-gl";

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const users = await prisma.user.findMany();

  return (
    <main className="relative">
      <div className="relative w-full top-0 left-0 right-0 h-[40dvh] md:h-dvh flex items-center justify-center z-10">
        <MapboxGl debug users={users} />
      </div>

      <div className="absolute md:max-w-96 top-0 left-0 md:left-6 flex flex-col pt-[40dvh] md:pt-0 md:min-h-dvh max-h-dvh z-0 md:z-20 py-12 md:top-6">
        {children}
      </div>

      {modal}
    </main>
  );
}
