const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema(
  {
    password: { type: String, require: true },
    email: { type: String, require: false },
    metaMaskAddress: { type: String, require: false },
    role: { type: String, require: false },
    isConfirmedEmail: { type: Boolean, require: false },
  },
  { timestamp: true }
)

export default mongoose.model('User', userSchema)
