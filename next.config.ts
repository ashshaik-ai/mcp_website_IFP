import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* experimental.inlineCss was tried here and made things worse. It does remove
     both render-blocking stylesheet requests, but it inlines the whole sheet
     into every document: the homepage went from 20 KB to 76 KB gzipped, the
     CSS stopped being cacheable across pages, and the Performance score fell
     from 77 to 71 with Speed Index going 3.7 s to 5.2 s. The two round trips
     are the cheaper cost. */
};

export default nextConfig;
