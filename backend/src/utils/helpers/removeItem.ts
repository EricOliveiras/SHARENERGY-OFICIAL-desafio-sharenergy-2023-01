export function removeItem(arr: string[], refId: string) {
  return arr.filter(function(i) { return i !== refId; });
}
