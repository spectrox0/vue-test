export const getPayloadToEdit = <
  T extends Omit<Record<string, any>, "id">,
  K extends keyof T = keyof T
>(
  id: number,
  currentValue: T,
  initialValue: T
) => {
  const payload = {} as Partial<T>;

  Object.keys(currentValue).forEach((key) => {
    if (currentValue[key as K] !== initialValue[key as K]) {
      payload[key as K] = currentValue[key as K];
    }
  });
  return Object.assign(payload, { id });
};
