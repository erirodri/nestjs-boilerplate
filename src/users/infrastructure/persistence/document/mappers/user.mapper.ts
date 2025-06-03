import { User } from '../../../../domain/user';
import { UserSchemaClass } from '../entities/user.schema';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const domainEntity = new User();
    domainEntity.id = raw._id.toString();
    domainEntity.username = raw.username;
    domainEntity.email = raw.email;
    domainEntity.password = raw.password;
    domainEntity.avatar = raw.avatar;
    domainEntity.is_disabled = raw.is_disabled;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserSchemaClass {
    const persistenceSchema = new UserSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.username = domainEntity.username;
    persistenceSchema.email = domainEntity.email;
    persistenceSchema.password = domainEntity.password;
    persistenceSchema.avatar = domainEntity.avatar;
    persistenceSchema.is_disabled = domainEntity.is_disabled;
    return persistenceSchema;
  }
}
