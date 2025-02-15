// src/schemas/user-preference.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserPreferenceDocument = UserPreference & Document;

@Schema({ timestamps: true })
export class UserPreference {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
    type: {
      marketing: Boolean,
      newsletter: Boolean,
      updates: Boolean,
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'never'],
      },
      channels: {
        email: Boolean,
        sms: Boolean,
        push: Boolean,
      },
    },
  })
  preference: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'never';
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };

  @Prop({ required: true })
  timeZone: string;

  @Prop({ default: Date.now })
  lastUpdated: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference);
