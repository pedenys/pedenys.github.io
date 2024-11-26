// 1. Importez des utilitaires depuis `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Définissez votre (vos) collection(s)
const postsCollection = defineCollection({ type: "content" });
// 3. Exportez un objet `collections` unique pour enregistrer votre (vos) collection(s)
//    Cette clé doit correspondre au nom du répertoire de votre collection dans "src/content"
export const collections = {
  posts: postsCollection,
  schema: z.object({
    title: z.string(),
    date: z.string().date(),
  }),
};
