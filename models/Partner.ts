const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partnerSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamp: true }
)

export default mongoose.model('Partner', partnerSchema)

export type TPartner = {
  _id: string
  user: string
  name: string
  description: string
}