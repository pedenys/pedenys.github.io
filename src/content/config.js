import { z, defineCollection } from "astro:content";

// 2. Définie le `type` et le `schema` pour chaque collection
const entries = defineCollection({
  type: "content", // v2.5.0 et plus
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tag: z.string(),
    layout: z.string(),
  }),
});

// 3. Exporter un objet `collections` unique pour enregistrer votre ou vos collection(s)
export const collections = {
  entries: entries,
};
