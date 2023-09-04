import { Menu } from "@/models";

export const isParent = (parentId: number, menus: Menu[]): boolean => {
  for (const menu of menus) {
    if (menu.parentId === parentId) {
      return true;
    }
    if (menu.children?.length) {
      return isParent(parentId, menu.children);
    }
  }
  return false;
};
