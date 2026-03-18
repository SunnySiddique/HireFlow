export function toError(error: unknown): never {
  if (error instanceof Error) throw error;
  throw new Error(String(error));
}
