// src/notifications/notifications.controller.ts

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  async sendNotification(@Body() notificationDto: SendNotificationDto) {
    return this.notificationsService.sendNotification(notificationDto);
  }

  @Get(':userId/logs')
  async getUserLogs(@Param('userId') userId: string) {
    return this.notificationsService.getUserLogs(userId);
  }

  @Get('stats')
  async getStats() {
    return this.notificationsService.getStats();
  }
}
