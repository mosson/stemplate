/**
 * Unsafe! Not for production usage
 * ## Example
 *
 * ```typescript
 * template<{ name: string; account: string }>(
    "name: ${this.name}, account: ${this.account}",
  )({
    name: "mosson",
    account: "github.com/mosson",
  }),
  // => "name: mosson, account: github.com/mosson"
 * ```
 */
export function template<T>(source: string): (binding: T) => string {
  return (binding: T) => {
    return new Function(`return \`${source}\`;`).call(binding);
  };
}
