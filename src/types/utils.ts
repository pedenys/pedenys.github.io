type Container<T> = {
  value: T;
};

export type ExtractType<T> = T extends Container<infer U> ? U : never;
