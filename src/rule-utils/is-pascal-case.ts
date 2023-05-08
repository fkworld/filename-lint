export function isPascalCase(s: string): boolean {
	return /^[A-Z][a-zA-Z0-9]+$/.test(s);
}
