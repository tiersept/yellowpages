import { useRouter } from "next/navigation";
import { useLayoutStore } from "./store";

const NAVIGATION_DURATION = 300;

export const useLayoutNavigation = () => {
  const router = useRouter();
  const {
    isOpen,
    animatingId,
    setIsOpen,
    setShouldClose,
    shouldClose,
    setAnimatingId,
  } = useLayoutStore();

  const open = () => {
    setIsOpen(true);
    setShouldClose(true);
  };

  const close = () => {
    if (shouldClose) {
      setIsOpen(false);
      setTimeout(() => {
        router.back();
      }, NAVIGATION_DURATION);
    }
  };

  const pushToUserPage = (id: number) => {
    setAnimatingId(id);

    router.push(`/user/${id}`);
  };

  return {
    isOpen,
    open,
    close,
    setIsOpen,
    shouldClose,
    animatingId,
    setAnimatingId,
    pushToUserPage,
  };
};
