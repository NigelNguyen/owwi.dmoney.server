const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    partner: { type: Schema.Types.ObjectId, ref: 'Partner', required: false },
    amount: { type: Number, required: true },
    description: { type: String, required: true }
  },
  { timestamp: true }
)

export default mongoose.model('Record', recordSchema)

export type TRecord = {
  _id: string
  user: string
  type: {
    _id: string
    name: string
  }
  category: {
    _id: string
    name: string
  }
  partner: {
    _id: string
    name: string
  }
  amount: number
  description: string
}
