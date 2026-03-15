/**
 * Returns the image URL. Previously used Supabase image transformations
 * but reverted to original URLs for better quality.
 */
export function getOptimizedImageUrl(
  url: string,
  _width: number = 400,
  _quality: number = 75
): string {
  return url;
}
