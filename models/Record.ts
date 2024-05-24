const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    partner: { type: Schema.Types.ObjectId, ref: 'Partner', required: false },
    amount: { type: Number, required: true },
    description: { type: String, required: false },
    typeName: { type: String, required: false },
    date: { type: Date, required: true },
    categoryName: { type: String, required: false },
    partnerName: { type: String, required: false }
  },
  { timestamp: true }
)

export default mongoose.model('Record', recordSchema)

export type TRecord = {
  _id: string
  user: string
  typeName: string
  categoryName: string
  partnerName: string
  amount: number
  date: Date
  description: string
}
