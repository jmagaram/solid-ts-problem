import { JSXElement, Show } from "solid-js";

function ShowType<A, B extends A>(props: {
  value: A;
  isB: (a: A) => NonNullable<B> | undefined;
  asB: (i: NonNullable<B>) => JSXElement;
  fallback?: JSXElement;
}) {
  return (
    <Show when={props.isB(props.value) !== undefined} fallback={props.fallback}>
      {props.asB(props.value as NonNullable<B>)}
    </Show>
  );
}

type User =
  | { tag: "anonymous" }
  | { tag: "signedIn"; userName: string; avatar: string };

// Type checks and works fine on my computer and gives proper auto-complete for
// the asB function my computer, but produces a type error in the SolidJS
// playground
const Greeting1 = (s: User) =>
  ShowType({
    value: s,
    isB: (i) => (i.tag === "signedIn" ? i : undefined),
    asB: (b) => "Hi, " + b.userName,
    fallback: "Hello stranger!",
  });

// TypeScript error
const Greeting2 = (s: User) => (
  <ShowType
    value={s}
    isB={(i) => (i.tag === "signedIn" ? i : undefined)}
    asB={(b) => "Hi, " + b.userName}
    fallback="Hello stranger!"
  />
);
