export function sanitization(input) {
	return input.replace(/\0/g, '')
	  .replace(/&/g, '&amp;')
	  .replace(/</g, '&lt;')
	  .replace(/>/g, '&gt;')
	  .replace(/"/g, '&#34;')
	  .replace(/'/g, '&#39;');
}
