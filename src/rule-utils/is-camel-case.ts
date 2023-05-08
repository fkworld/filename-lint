export function isCamelCase(s: string): boolean {
	return /^[a-z0-9][a-zA-Z0-9]+$/.test(s);
}
