import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'

export default class Cidade extends BaseModel {

  @hasMany(() => Cliente)
  public clientes: HasMany<typeof Cliente> 

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public estadoId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}