const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true },
    content: { type: String, require: true }
  },
  { timestamp: true }
)

export default mongoose.model('Transaction', transactionSchema)
