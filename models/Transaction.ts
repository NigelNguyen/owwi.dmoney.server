const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true }
  },
  { timestamp: true }
)

export default mongoose.model('Transaction', transactionSchema)
