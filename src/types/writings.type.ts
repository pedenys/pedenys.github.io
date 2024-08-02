export type Post = {
  frontmatter: {
    date: string;
    title: string;
    tag: string[];
    description: string;
  };
  url: string;
};

export type Entry = {
  frontmatter: {
    date: string;
    title: string;
    tag: string[];
  };
  url: string;
};
