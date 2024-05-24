const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamp: true }
)

export default mongoose.model('Category', categorySchema)

export type TCategory = {
  _id: string
  user: string
  name: string
  description: string
}
