import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'novan@gmail.com',
        password: '123456',
      },
      {
        email: 'rizal@gmail.com',
        password: '123456',
      },
    ])
  }
}
