import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class FarmerException extends Exception {
  public async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).json({
      message: error.message,
    })
  }
}
