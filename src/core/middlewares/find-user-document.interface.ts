import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from '../../modules/user/user.entity.js';

export interface FindUserDocumentInterface {
  findByID(id: string): Promise<DocumentType<UserEntity> | null>;
}
