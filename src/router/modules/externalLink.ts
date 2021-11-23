import Layout from "/@/layout/index.vue";

const externalLink = {
  path: "/external",
  name: "external",
  component: Layout,
  meta: {
    icon: "Link",
    title: "外链",
    showLink: true,
    rank: 190,
  },
  children: [
    {
      path: "https://www.baidu.com",
      meta: {
        title: "百度一下",
        showLink: true,
        rank: 191,
      },
    },
  ],
};

export default externalLink;
