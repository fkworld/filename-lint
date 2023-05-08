export function isScreamingSnakeCase(s: string): boolean {
	return /^[A-Z0-9_]+$/.test(s);
}
