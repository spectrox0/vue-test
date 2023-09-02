export interface Menu {
  id: number;
  parent: number | null;
  name: string;
  children: Menu[];
}

export type MenuForm = { name: string };
