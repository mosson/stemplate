# 簡易なテンプレートエンジン

テンプレートリテラルを評価するだけのシンプルなテンプレート `forEach` の繰り返しや `if` でブロックを評価することはできない。

## Example

```typescript
import { template } from "./stemplate.ts";

template("Hello, ${this.name}!")({ name: "mosson" }); // Hello, mosson!

// using Generics
template<{ name: string }>("${this.name}")({
  name: "mosson",
});

// type safe
/**
 * template<{name: string}>("${this.name}")({name: "mosson", account: "github.com/mosson"})
 * Argument of type '{ name: string; account: string; }' is not assignable to parameter of type '{ name: string; }'.
Object literal may only specify known properties, and 'account' does not exist in type '{ name: string; }'.
  */
```
