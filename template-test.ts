import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { template } from "./template.ts";

Deno.test("simple template engine", () => {
  assertEquals(
    template("Hello, ${this.name}!")({ name: "mosson" }),
    "Hello, mosson!",
  );

  // escape
  assertEquals(
    template("Hello, ${this.name}!")({ name: '"mosson"' }),
    'Hello, "mosson"!',
  );
  assertEquals(
    template("Hello, ${this.name}!")({ name: "'mosson'" }),
    "Hello, 'mosson'!",
  );
  assertEquals(
    template("Hello, ${this.name}!")({ name: "`mosson`" }),
    "Hello, `mosson`!",
  );

  // multiple
  assertEquals(
    template("name: ${this.name}, account: ${this.account}")({
      name: "mosson",
      account: "github.com/mosson",
    }),
    "name: mosson, account: github.com/mosson",
  );

  // evaluate
  const binding = { count: 0 };
  const render = template("count up by call. current count is ${++this.count}");
  render(binding);
  assertEquals(binding.count, 1);
  render(binding);
  assertEquals(binding.count, 2);
  assertEquals(
    render(binding),
    `count up by call. current count is 3`,
  );
  assertEquals(binding.count, 3);

  // missing property
  assertEquals(
    template("no throws. ${this.foo}")({}),
    "no throws. undefined",
  );

  // generics
  assertEquals(
    template<{ name: string }>("type safe coding. ${this.name}")({
      name: "mosson",
    }),
    "type safe coding. mosson",
  );

  template<{ name: string }>("${this.name}")({
    name: "mosson",
  });
  /**
   * template<{name: string}>("${this.name}")({name: "mosson", account: "github.com/mosson"})
   * Argument of type '{ name: string; account: string; }' is not assignable to parameter of type '{ name: string; }'.
  Object literal may only specify known properties, and 'account' does not exist in type '{ name: string; }'.
   */
});
