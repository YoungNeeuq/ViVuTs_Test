import express from 'express'

import { login, register } from '../controllers/authentication'

export default (router: express.Router) => {
  router.post('/authen/register', register)
  router.post('/authen/login', login)
}
