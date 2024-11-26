import type { collections } from "@/content/config";
import type { ExtractType } from "./utils";
import type { ContentEntryMap } from "astro:content";

export type Post =
  ExtractType<typeof collections.posts> extends never
    ? any
    : ExtractType<typeof collections.posts>;
