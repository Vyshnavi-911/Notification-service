// src/notifications/notifications.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotificationLog,
  NotificationLogDocument,
} from '../schemas/notification-log.schema';
import { Model } from 'mongoose';
import { SendNotificationDto } from './dto/send-notification.dto';
import { NotFoundException } from '../exceptions/not-found.exception';
import { UserPreferencesService } from '../user-preferences/user-preferences.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationLog.name)
    private notificationLogModel: Model<NotificationLogDocument>,
    private readonly userPreferencesService: UserPreferencesService,
  ) {}

  async sendNotification(
    notificationDto: SendNotificationDto,
  ): Promise<NotificationLog> {
    // Check if user exists
    const userPreference = await this.userPreferencesService.findOne(
      notificationDto.userId,
    );

    // Check if user has enabled notifications of this type and channel
    if (
      !userPreference.preference[notificationDto.type] ||
      !userPreference.preference.channels[notificationDto.channel]
    ) {
      throw new NotFoundException(
        `User has opted out of ${notificationDto.type} notifications via ${notificationDto.channel}`,
      );
    }

    const notificationLog = new this.notificationLogModel({
      userId: notificationDto.userId,
      type: notificationDto.type,
      channel: notificationDto.channel,
      status: 'pending',
      metadata: notificationDto.metadata,
    });

    try {
      // Simulate sending logic
      const isSuccess = Math.random() > 0.2; // 80% chance of success
      if (isSuccess) {
        notificationLog.status = 'sent';
        notificationLog.sentAt = new Date();
      } else {
        notificationLog.status = 'failed';
        notificationLog.failureReason = 'Simulated failure';
      }
    } catch (error) {
      notificationLog.status = 'failed';
      notificationLog.failureReason = error.message;
    }

    return notificationLog.save();
  }

  async getUserLogs(userId: string): Promise<NotificationLog[]> {
    return this.notificationLogModel.find({ userId }).exec();
  }

  async getStats(): Promise<any> {
    const totalNotifications = await this.notificationLogModel.countDocuments();
    const sentNotifications = await this.notificationLogModel.countDocuments({
      status: 'sent',
    });
    const failedNotifications = await this.notificationLogModel.countDocuments({
      status: 'failed',
    });

    return {
      totalNotifications,
      sentNotifications,
      failedNotifications,
    };
  }
}
