/**
 * Transforms a Supabase storage URL to use image transformation
 * for serving optimized, smaller images.
 * @param url Original image URL
 * @param width Desired width
 * @param quality Image quality (1-100)
 */
export function getOptimizedImageUrl(
  url: string,
  width: number = 400,
  quality: number = 75
): string {
  // Only transform Supabase storage URLs
  if (!url.includes('supabase.co/storage/v1/object/public/')) {
    return url;
  }
  
  // Convert public URL to render (transformation) URL
  // From: /storage/v1/object/public/bucket/path
  // To:   /storage/v1/render/image/public/bucket/path?width=X&quality=Y
  return url.replace(
    '/storage/v1/object/public/',
    `/storage/v1/render/image/public/`
  ) + `?width=${width}&quality=${quality}`;
}
