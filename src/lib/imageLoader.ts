/**
 * Custom loader cho next/image khi export tĩnh lên GitHub Pages.
 *
 * Site trên GitHub Pages nằm ở https://<user>.github.io/<repo>/, nên ảnh
 * trong thư mục public (vd "/images/hero.jpg") phải thành "/<repo>/images/hero.jpg".
 * next/image KHÔNG tự thêm basePath cho src dạng chuỗi, nên loader này làm việc đó.
 *
 * - URL ngoài (https://...), data:, blob: được giữ nguyên.
 * - Đường dẫn đã có basePath thì không thêm lần nữa.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  if (!basePath) return src;
  if (!src.startsWith('/') || src.startsWith('//')) return src;
  if (src === basePath || src.startsWith(`${basePath}/`)) return src;
  return `${basePath}${src}`;
}
