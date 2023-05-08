export function isSnakeCase(s: string): boolean {
	return /^[a-z0-9-]+$/.test(s);
}
