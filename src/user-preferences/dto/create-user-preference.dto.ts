// src/user-preferences/dto/create-user-preference.dto.ts

import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsString,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class ChannelsDto {
    @IsBoolean()
    email: boolean;
  
    @IsBoolean()
    sms: boolean;
  
    @IsBoolean()
    push: boolean;
  }
  
  class PreferenceDto {
    @IsBoolean()
    marketing: boolean;
  
    @IsBoolean()
    newsletter: boolean;
  
    @IsBoolean()
    updates: boolean;
  
    @IsEnum(['daily', 'weekly', 'monthly', 'never'])
    frequency: 'daily' | 'weekly' | 'monthly' | 'never';
  
    @ValidateNested()
    @Type(() => ChannelsDto)
    channels: ChannelsDto;
  }
  
  export class CreateUserPreferenceDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
  
    @IsEmail()
    email: string;
  
    @ValidateNested()
    @Type(() => PreferenceDto)
    preference: PreferenceDto;
  
    @IsString()
    timeZone: string;
  }
  