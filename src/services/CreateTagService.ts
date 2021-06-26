import { getCustomRepository } from 'typeorm'
import { TagsRepository } from '../repositories/TagsRepository'

export class CreateTagService {
  async execute(name: string) {
    const tagsRepository = getCustomRepository(TagsRepository)
    if (!name) {
      throw new Error('Incorrect Name')
    }

    const tagAlreadyExists = await tagsRepository.findOne({ name })

    if (tagAlreadyExists) {
      throw new Error('Tag already Exists')
    }

    const tag = tagsRepository.create({ name })

    await tagsRepository.save(tag)

    return tag
  }
}
