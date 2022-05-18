import type { ContractTransaction, ContractReceipt } from 'ethers'

export async function safe<T>(promise: Promise<T>): Promise<[T, null] | [null, unknown]> {
  try {
    const result = await promise
    return [result, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export async function safeWrite(
  txPromise: Promise<ContractTransaction>,
  errorCallback?: (error: any) => void
): Promise<[ContractTransaction | null, ContractReceipt | null]> {
  const [tx, errorTx] = await safe(txPromise)

  if (tx) return [tx, await tx.wait()]

  errorCallback?.(errorTx)
  return [null, null]
}

export async function safeRead<T>(
  promise: Promise<T>,
  defaultValue: T,
  errorCallback?: (error: any) => void
): Promise<T> {
  const [result, errorResult] = await safe(promise)
  if (result) return result
  errorCallback?.(errorResult)
  return defaultValue
}
