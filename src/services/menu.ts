import type { Menu, MenuForm } from "@/models";
import { CommonService } from "./crud";

export class MenuService extends CommonService<Menu, MenuForm> {
  constructor() {
    super("/menus");
  }
  // TODO: Add methods to interact with the menu API
}

export const menuService = Object.freeze(new MenuService());
