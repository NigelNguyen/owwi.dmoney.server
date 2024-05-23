import Transaction from '../models/Transaction'

export const createTransactionRepository = async ({ user, transaction }: { user: string; transaction: string }) => {
  const newTransaction = await new Transaction({ user: user, content: transaction })
  return await newTransaction.save()
}
