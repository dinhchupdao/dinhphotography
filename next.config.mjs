/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

let assetPrefix = undefined;
let basePath = undefined;

if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  // "dinhchupdao/dinhphotography" -> site chạy tại /dinhphotography
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig = {
  reactStrictMode: true,
  output: isGithubActions ? 'export' : undefined,
  trailingSlash: isGithubActions, // /booking -> /booking/index.html, tránh 404 khi F5 trên GitHub Pages
  assetPrefix,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath || '',
  },
  // Trên GitHub Pages: dùng loader riêng để tự thêm basePath vào ảnh "/images/...".
  // Khi chạy local (npm run dev / build thường): giữ nguyên như cũ.
  images: isGithubActions
    ? { loader: 'custom', loaderFile: './src/lib/imageLoader.ts' }
    : { unoptimized: true },
};

export default nextConfig;
