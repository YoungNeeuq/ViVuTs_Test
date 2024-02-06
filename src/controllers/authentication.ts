import express from 'express'

import { getUserByEmail, createUser } from '../models/users'
import { customPassword, random } from '../helpers'

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body
    //Validation
    if (!email && !password) {
      return res.send('"email" is not allowed to be empty, "password" is not allowed to be empty').sendStatus(400)
    }
    if (!email) {
      return res.send('"email" is not allowed to be empty').sendStatus(400)
    }
    if (!password) {
      return res.send('"password" is not allowed to be empty').sendStatus(400)
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

    if (!user) {
      return res.send('Incorrect email or password').sendStatus(400)
    }

    const expectedHash = customPassword(user.authentication.salt, password)

    if (user.authentication.password != expectedHash) {
      return res.send('Incorrect email or password').sendStatus(400)
    }

    const salt = random()
    user.authentication.sessionToken = customPassword(salt, user._id.toString())

    await user.save()

    // res.cookie('uvivu-authen', user.authentication.sessionToken, { domain: 'localhost', path: '/' })

    return res.status(200).json(user).end()
  } catch (error) {
    console.log(error)
  }
}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body
    let username = ''
    //Validation
    if (!email && !password) {
      return res.sendStatus(400).send('"email" is not allowed to be empty, "password" is not allowed to be empty')
    }
    if (!email) {
      return res.sendStatus(400).send('"email" is not allowed to be empty')
    }
    if (!password) {
      return res.sendStatus(400).send('"password" is not allowed to be empty')
    }
    if (password.length < 6) {
      return res.status(400).send('Password must be at least 6 characters long')
    }
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return res.status(400).send('Your email is existed. Please try other email.')
    }

    const salt = random()
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: customPassword(salt, password)
      }
    })

    return res.status(200).json(user).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
