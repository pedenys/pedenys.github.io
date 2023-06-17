export type Post = {
  frontmatter: {
    date: string;
    title: string;
    tag: string[];
    description: string;
  };
  url: string;
};
