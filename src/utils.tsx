export const removeDuplicate = (array: string[]): string[] => {
  return array
    .map((i: string) => i?.toLowerCase())
    .filter((item: string, index: number) => {
      return array.indexOf(item) !== index;
    });
};
