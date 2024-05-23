const mongoose = require('mongoose')
const Schema = mongoose.Schema

const typeSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamp: true }
)

export default mongoose.model('Type', typeSchema)

export type TType = {
  _id: string
  name: string
  description: string
}
