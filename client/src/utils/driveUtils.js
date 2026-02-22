// Helper utilities to convert Google Drive share links to embeddable/direct URLs
export function convertDriveImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  const u = url.trim();
  // Match /file/d/ID/ or ?id=ID or &id=ID
  const m = u.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || u.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m && m[1]) {
    return `https://drive.google.com/uc?export=view&id=${m[1]}`;
  }
  return u;
}

export function convertDriveVideoUrl(url) {
  if (!url || typeof url !== 'string') return url;
  const u = url.trim();
  const m = u.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || u.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m && m[1]) {
    return `https://drive.google.com/file/d/${m[1]}/preview`;
  }
  return u;
}

export default {
  convertDriveImageUrl,
  convertDriveVideoUrl
};
