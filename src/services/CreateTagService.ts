import { getCustomRepository } from 'typeorm'
import { TagsRepository } from '../repositories/TagsRepository'

export class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepository)
    if (!name) {
      throw new Error('Incorrect Name')
    }

    const tagAlreadyExists = await tagsRepositories.findOne({ name })

    if (tagAlreadyExists) {
      throw new Error('Tag already Exists')
    }

    const tag = tagsRepositories.create({ name })

    await tagsRepositories.save(tag)

    return tag
  }
}
