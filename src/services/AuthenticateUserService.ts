import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'

interface IAuthenticateRequest {
  email: string
  password: string
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({ email })

    if (!user) {
      throw new Error('Email/Password Incorrect')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Email/Password Incorrect')
    }

    const token = sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    )

    return token
  }
}
