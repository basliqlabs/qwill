type NodeError = Error & { code?: string }

export function isNodeError(err: unknown): err is NodeError {
	return typeof err === 'object' && err !== null && 'code' in err
}
