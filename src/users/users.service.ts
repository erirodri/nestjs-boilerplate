import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { User } from './domain/user';
import bcrypt from 'bcryptjs';
import { FilesService } from '../files/files.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Do not remove comment below.
    // <creating-property />

    let username: string = '';
    if (createUserDto.username) {
      const userObject = await this.usersRepository.findByUsername(
        createUserDto.username,
      );
      if (userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            username: 'usernameAlreadyExists',
          },
        });
      }
      username = createUserDto.username;
    }
    let password: string = '';

    if (createUserDto.password) {
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(createUserDto.password, salt);
    }

    let email: string = '';

    if (createUserDto.email) {
      const userObject = await this.usersRepository.findByEmail(
        createUserDto.email,
      );
      if (userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailAlreadyExists',
          },
        });
      }
      email = createUserDto.email;
    }
    let avatar: string = '';
    if (createUserDto.avatar) {
      avatar = createUserDto.avatar;
    } else if (createUserDto.avatar === null) {
      avatar = 'null';
    }
    return this.usersRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      username: username,
      email: email,
      password: password,
      avatar: avatar,
      is_disabled: false,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    return this.usersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: User['id']): Promise<NullableType<User>> {
    return this.usersRepository.findById(id);
  }

  async update(
    id: User['id'],
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    // Do not remove comment below.
    // <updating-property />

    let password: string | undefined = undefined;
    if (updateUserDto.password) {
      const userObject = await this.usersRepository.findById(id);
      if (userObject && userObject?.password !== updateUserDto.password) {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(updateUserDto.password, salt);
      }
    }

    let username: string | undefined = undefined;

    if (updateUserDto.username) {
      const userObject = await this.usersRepository.findByUsername(
        updateUserDto.username,
      );
      if (userObject && userObject.id !== id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            username: 'usernameAlreadyExists',
          },
        });
      }
      username = updateUserDto.username;
    }

    let email: string | undefined = undefined;

    if (updateUserDto.email) {
      const userObject = await this.usersRepository.findByEmail(
        updateUserDto.email,
      );
      if (userObject && userObject.id !== id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailAlreadyExists',
          },
        });
      }
      email = updateUserDto.email;
    }

    let is_disabled: boolean | undefined = undefined;

    if (updateUserDto.is_disabled) {
      const userObject = await this.usersRepository.findById(id);
      if (userObject && userObject.is_disabled !== updateUserDto.is_disabled) {
        is_disabled = updateUserDto.is_disabled;
      }
    }

    let avatar: string | undefined = undefined;

    if (updateUserDto.avatar) {
      const userObject = await this.usersRepository.findById(id);
      if (userObject && userObject.avatar !== updateUserDto.avatar) {
        avatar = updateUserDto.avatar;
      }
    }

    return this.usersRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      username,
      email,
      password,
      avatar,
      is_disabled,
    });
  }

  findByIds(ids: User['id'][]): Promise<User[]> {
    return this.usersRepository.findByIds(ids);
  }

  findByEmail(email: User['email']): Promise<NullableType<User>> {
    return this.usersRepository.findByEmail(email);
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersRepository.remove(id);
  }
}
