import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import styleImport from "vite-plugin-style-import";
import ElementPlus from "unplugin-element-plus/vite";
import themePreprocessorPlugin from "@zougt/vite-plugin-theme-preprocessor";

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

const alias: Record<string, string> = {
  "/@": pathResolve("src"),
  "@build": pathResolve("build"),
};

export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({}),
    // styleImport({
    //   libs: [
    //     // 按需加载vxe-table
    //     {
    //       libraryName: "vxe-table",
    //       esModule: true,
    //       ensureStyleFile: true,
    //       resolveComponent: (name) => `vxe-table/es/${name}`,
    //       resolveStyle: (name) => `vxe-table/es/${name}/style.css`,
    //     },
    //   ],
    // }),
    themePreprocessorPlugin({
      scss: {
        multipleScopeVars: [
          // {
          //   // 暗雅（默认）
          //   scopeName: "layout-theme-default",
          //   path: pathResolve("src/layout/theme/default-vars.scss"),
          // },
          {
            // 明亮
            scopeName: "layout-theme-default",
            path: pathResolve("src/layout/theme/light-vars.scss"),
          },
          {
            // 薄暮
            scopeName: "layout-theme-dusk",
            path: pathResolve("src/layout/theme/dusk-vars.scss"),
          },
          {
            // 火山
            scopeName: "layout-theme-volcano",
            path: pathResolve("src/layout/theme/volcano-vars.scss"),
          },
          {
            // 黄色
            scopeName: "layout-theme-yellow",
            path: pathResolve("src/layout/theme/yellow-vars.scss"),
          },
          {
            // 明青
            scopeName: "layout-theme-mingQing",
            path: pathResolve("src/layout/theme/mingQing-vars.scss"),
          },
          {
            // 极光绿
            scopeName: "layout-theme-auroraGreen",
            path: pathResolve("src/layout/theme/auroraGreen-vars.scss"),
          },
          {
            // 粉红
            scopeName: "layout-theme-pink",
            path: pathResolve("src/layout/theme/pink-vars.scss"),
          },
          {
            // 酱紫
            scopeName: "layout-theme-saucePurple",
            path: pathResolve("src/layout/theme/saucePurple-vars.scss"),
          },
        ],
        // 默认取 multipleScopeVars[0].scopeName
        defaultScopeName: "",
        // 在生产模式是否抽取独立的主题css文件，extract为true以下属性有效
        extract: true,
        // 独立主题css文件的输出路径，默认取 viteConfig.build.assetsDir 相对于 (viteConfig.build.outDir)
        outputDir: "",
        // 会选取defaultScopeName对应的主题css文件在html添加link
        themeLinkTagId: "head",
        // "head"||"head-prepend" || "body" ||"body-prepend"
        themeLinkTagInjectTo: "head",
        // 是否对抽取的css文件内对应scopeName的权重类名移除
        removeCssScopeName: false,
        // 可以自定义css文件名称的函数
        customThemeCssFileName: (scopeName) => scopeName,
      },
    }),
  ],
  resolve: {
    alias,
  },
  define: {
    "process.env": {},
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  optimizeDeps: {
    exclude: ["@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"],
  },
  build: {
    // @ts-ignore
    sourcemap: false,
    brotliSize: false,
    // 消除打包大小超过500kb警告
    // chunkSizeWarningLimit: 2000,
    minify: false,
  },
});
