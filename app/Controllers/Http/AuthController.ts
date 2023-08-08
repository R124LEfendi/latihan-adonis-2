import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    try {
      // Get values from request body
      const { email, password } = request.body()

      // Check if user with the given email already exists
      const oldUser = await User.query().where('email', email).first()
      if (oldUser) {
        return response.status(422).json({
          message: 'Email sudah terdaftar!',
        })
      }

      // Create a new user
      const user = await User.create({ email, password })

      // Get token for the new user
      const token = await auth.use('api').attempt(email, password)

      // Return user and token details
      return {
        user,
        token,
      }
    } catch (error) {
      // Handle errors properly
      console.log(error)
      return response.unauthorized('Terjadi kesalahan saat mencoba mendaftar.')
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    //get req body
    const { email, password } = request.body()

    //get user by email
    const user = await User.query().where({ email: email }).first()
    if (!user)
      return response.status(422).json({
        message: 'email sudah terdaftar',
      })

    //check password
    if (!(await Hash.verify(user.password, password))) {
      return response.status(422).json({
        message: 'password salah',
      })
    }

    //api token
    const token = await auth.use('api').generate(user)

    //return
    return response.json({
      data: {
        user: user,
        token: token,
      },
    })
  }
}
