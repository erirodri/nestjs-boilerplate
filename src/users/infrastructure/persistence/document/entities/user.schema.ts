import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserSchemaClass extends EntityDocumentHelper {
  @Prop()
  username: string;

  @Prop({
    type: String,
    unique: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop({
    default: '',
  })
  avatar: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop({ default: false })
  is_disabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);
