// src/notifications/dto/send-notification.dto.ts

import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class SendNotificationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsEnum(['marketing', 'newsletter', 'update'])
  type: 'marketing' | 'newsletter' | 'update';

  @IsEnum(['email', 'sms', 'push'])
  channel: 'email' | 'sms' | 'push';

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
