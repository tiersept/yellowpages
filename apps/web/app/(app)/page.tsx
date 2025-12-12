import { Suspense } from "react";
import { UserList } from "../../components/user-list";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading!!</div>}>
      <UserList />
    </Suspense>
  );
}
