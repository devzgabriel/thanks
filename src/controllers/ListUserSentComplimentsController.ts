import { Request, Response } from 'express'
import { ListUserComplimentsSentService } from '../services/ListUserComplimentsSentService'

export class ListUserComplimentsSentController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const listUserComplimentsSentService = new ListUserComplimentsSentService()

    const compliments = await listUserComplimentsSentService.execute(user_id)

    return response.json(compliments)
  }
}
