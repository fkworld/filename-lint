export function isKebabCase(s: string): boolean {
	return /^[a-z0-9-]+$/.test(s);
}
