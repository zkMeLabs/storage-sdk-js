import { type BytesLike, keccak256, SigningKey } from 'ethers'
import type { AuthType } from '../storage/types'

export function formatErrorMessage(error: any): string {
  try {
    const r = JSON.stringify(error)
    if (r !== '{}') {
      return r
    }
  } catch {
    //
  }
  return error?.message || 'Unknown error'
}

export function utf8ToBytes(str: string) {
  return new Uint8Array(new TextEncoder().encode(str))
}

export function getAuthorization (canonicalRequest: string, authType: AuthType) {
  const unsignedMsg = keccak256(utf8ToBytes(canonicalRequest))
  let authorization = ''
  if (authType.type === 'ECDSA') {
      const sig = secpSign(unsignedMsg, authType.privateKey)
      authorization = `GNFD1-ECDSA, Signature=${sig.slice(2)}`
  }
  // else {
  //     const sig = hexlify(ed25519.sign(hexlify(unsignedMsg).slice(2), authType.seed.slice(2)))
  //     authorization = `GNFD2-EDDSA,Signature=${sig.slice(2)}`
  // }
  return authorization;
}

export function secpSign(msg: string, privateKey: BytesLike) {
  const k = typeof privateKey === 'string'
    ? '0x' + privateKey.replace('0x', '')
    : privateKey
  const signingKey = new SigningKey(k)
  let signature = signingKey.sign(msg).serialized
  const v = signature.slice(-2)
  if (v === '1c')
      signature = signature.slice(0, -2) + '01'
  if (v === '1b')
      signature = signature.slice(0, -2) + '00'
  return signature;
}
