const htmlReplacements: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

export function escapeHTML(str: string): string {
  return str.replace(/[&<>"'`=\/]/g, (s) => htmlReplacements[s]);
}

export function escapeMarkdown(str: string): string {
  return str.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
}

export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
