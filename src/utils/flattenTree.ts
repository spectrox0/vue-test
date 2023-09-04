import { Menu } from "@/models";

export const flattenTree = (
  tree: Menu[],
  array: Omit<Menu, "children">[] = []
): Omit<Menu, "children">[] => {
  for (const node of tree) {
    // Extract children to avoid infinite recursion
    const { children, ...rest } = node;
    // add the current node to the array
    array.push(rest);
    if (children && children.length > 0) {
      flattenTree(children, array); // Llamada recursiva para los hijos
    }
  }
  return array;
};
