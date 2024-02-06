import mongoose from 'mongoose'

// User Config
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: false },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false }
  }
})

export const UserModel = mongoose.model('User', UserSchema)

// User Actions
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken })
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())
