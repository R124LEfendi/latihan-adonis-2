// database/migrations/1639232007772_users.ts
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 50).notNullable().unique() // ++
      table.string('email', 255).notNullable().unique() // add unique
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
