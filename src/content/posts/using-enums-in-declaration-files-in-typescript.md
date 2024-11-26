---
title: Using enums in declaration files (`.d.ts`) in TypeScript
date: june 2021
---

## TLDR

**Goal** : use implicit types declaration (`d.ts` files in a `@types` folder) allowing to not import types used in components (`./@types/myTypes.d.ts`) and enums.

The problems with enums in `d.ts` files show that **using implicit types declarations** (as with
@types folders holding interfaces, types and enums) **is not a viable solution** for now.

The best
solution is to declare types explicitly following a `./types/myTypes.ts` schema or alike.

Enums in declaration file for implicit types is probably a bad idea. Enums in normal `.ts` file
seems to be a better solution. The downside of having many type imports at the top of
the components is probably a fair price to pay for simplicity and consistency.

## Problems

### String enum is undefined in d.ts file

Declaring an enum initialised with strings (a string enum) inside a declaration file and use one of
its values inside code is the source of many cascading problems.

First problem : enums in `d.ts` are undefined when JS code is compiled (strings values from enums
seem to not be injected in the code, as it should with enum in normal `.ts` files). For example the
following code won't work :

```typescript
// order.d.ts
enum OrderStatusEnum {
    sent = "SENT_1"
    sending = "SENDING"
}

// components/order.tsx
const Order:React.FC<OrderProps> = ({status}) => {
    const isSent = status === OrderStatusEnum.sent // -> OrderStatusEnum is undefined

    return isSent ? "Succès !" : "Une erreur est survenue"
}

export default Order
```

### Enum cannot be exported from a d.ts file

To be able to access the value stored inside the string enum, a solution should be to declare our
enum with a const. That way, in a classical `.ts` file, string enum is transpiled directly to its
values, for example :

```typescript
// appTypes/order.ts
export const enum OrderStatusEnum {
    sent = "SENT_1"
    sending = "SENDING"
}

// components/order.tsx
import { OrderStatusEnum } from "../../appTypes/order.ts"

const isSent = status === OrderStatusEnum.sent
```

is transpiled to :

```javascript
const isSent = status === "SENT_1";
```

That should solve the problem, as with the `const enum` syntax, the enum value is directly injected
inside the Javascript during compilation. But wait (there's more), once we do that, TypeScript
strongly disagrees popping the following error :

> Cannot access ambient const enums when the '--isolatedModules' flag is provided.

`isolatedModule` option in tsconfig allows
transpilation to be more consistent and so must remain set to
true. One way to solve this TS error is to export the value we're using outside of the file where it
has been declared and initialised.

So writing something like this should work :

```typescript
// order.d.ts
export const enum OrderStatusEnum {
    sent = "SENT_1"
    sending = "SENDING"
}
```

Though, it's still not good. TS will now shout that it doesn't recognize the other types declared
in the same declaration file.

```typescript
// order.d.ts
export const enum OrderStatusEnum {
    sent = "SENT_1"
    sending = "SENDING"
}

interface OrderItem {
    id:string
    date:string
}

const a: OrderItem = {
  id:"2814cdax5da",
  date:"2020-05-18T12:33:56.510Z"
}
```

OrderEnum.sent is now accessible in the code... but `const a:OrderItem = {id:"2814cdax5da", date:"2020-05-18T12:33:56.510Z"}` will throw "Cannot find name 'OrderItem'.

So neither the const syntax nor exporting the enum from the d.ts file is possible while keeping the
isolatedModule option to true.

## Solutions to the enum problem in d.ts files

### 1/ Move enums to their own files

Since module isolation (i.e exporting enum) is a problem when inside a declaration file, storing
enums inside their own classical `.ts` file solves the problem :

```
./src
    @types/
        order.d.ts
        amount.d.ts
        enums/
            order.enum.ts <-- OrderStatusEnum is inside with the syntax "export enum OrderStatusEnum {...}"
```

The downside is we need to import the enum when used inside our code. It can feel weird to have
enums in their own .ts file and all the other types and interfaces in another file (d.ts).

```typescript
import { OrderStatusEnum } from "../../@types/enums/order.enum"; // --> import the enum

const Order: React.FC<OrderProps> = ({ status }) => {
  const isSent = status === OrderStatusEnum.sent;

  return isSent ? "Succès !" : "Une erreur est survenue";
};

export default Order;
```

### 2/ Types

Types allow to keep the constraints :

```typescript
// order.d.ts
type OrderStatusType = "SENT_1" | "SENDING";

// components/order.tsx

interface OrderProps {
  status: OrderStatusType;
}

const Order: React.FC<OrderProps> = ({ status }) => {
  const isSent = status === "SENT_1"; // --> TS will provide autocomplete to the developer

  return isSent ? "Success" : "Error";
};

export default Order;
```

The main con is we lose the flexibility of object-like string enums. Plus, it can be bad if the value
`"SENT_1"` needs to be renamed `"SENT_2"` in the future in case IDE global renaming using regex is not trustable.

## Conclusion

Using enums in declaration files in TypeScript is probably a bad idea.

The best
solution is to declare types explicitly following a `./types/myTypes.ts` schema or alike.

## Sources

- [TypeScript enums: How do they work? What can they be used for?](https://2ality.com/2020/01/typescript-enums.html)
- [Alternatives to enum in TypeScript](https://2ality.com/2020/02/enum-alternatives-typescript.html)
- [isolatedModule in tsconfig](https://www.typescriptlang.org/tsconfig#isolatedModules)
