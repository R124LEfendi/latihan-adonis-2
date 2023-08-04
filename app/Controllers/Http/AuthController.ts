import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'


export default class AuthController {

  async register({ request, response, auth }: HttpContextContract) {
    try {
      //get value from request body
      const { email, password } = request.body()
      //create user
      const user = await User.create({ email, password })

      //get token
      const token = await auth.use('api').attempt(email, password)
      //return detail
      return {
        user,
        token
      }

    } catch (error) {
      response.unauthorized('')
    }

  };


  async login({ request, response, auth }: HttpContextContract) {
    try {
      //get value from request body
      const { email, password } = request.body()
      //create user

      //get token
      const token = await auth.use('api').attempt(email, password)
      //return detail
      return {
        user: token.user,
      }

    }
    catch (error) {
      response.unauthorized('tidak mampu login')

    }
  }
}
