import { ethers } from 'ethers'

export const checkValidSignature = (message: string, signature: string, expectedAddress: string) => {
  const messageHash = ethers.hashMessage(message)

  const recoveredAddress = ethers.recoverAddress(messageHash, signature)

  return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase()
}
