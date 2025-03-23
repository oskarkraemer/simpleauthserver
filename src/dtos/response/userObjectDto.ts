import { User } from '@prisma/client';
import MessageResponse from '../../interfaces/responses/messageResponse';

export default interface UserObjectDto extends MessageResponse {
  user: User;
}