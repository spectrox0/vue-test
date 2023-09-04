export interface Menu {
  id: number;
  parentId: number | null;
  name: string;
  children: Menu[];
}

export type MenuForm = { name: string; parentId: number | null };
