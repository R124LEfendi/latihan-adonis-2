import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
export default class AuthController {

  async register({ request, response, auth }: HttpContextContract) {
    try {
      //get value from request body
      const { email, password } = request.body()

      const oldUser = await User.query().where({ email: email }).first()
      if (oldUser) {
        return response.status(422).json({
          message: 'Email sudah terdaftar! ',
        })
      }

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


  public async login({ request, response, auth }: HttpContextContract) {
    //get req body
    const { email, password } = request.body()

    //get user by email
    const user = await User.query().where({ email: email }).first()
    if (!user)
      return response.status(422).json({
        message: 'email sudah terdaftar'
      })

    //check password
    if (!(await Hash.verify(user.password, password))) {
      return response.status(422).json({
        message: 'password salah'
      })
    }

    //api token
    const token = await auth.use('api').generate(user)


    //return
    return response.json({
      data: {
        user: user,
        token: token
      }
    })
  }
}
