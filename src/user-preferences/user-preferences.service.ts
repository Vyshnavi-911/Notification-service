// src/user-preferences/user-preferences.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserPreference,
  UserPreferenceDocument,
} from '../schemas/user-preference.schema';
import { Model } from 'mongoose';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';
import {  BadRequestException } from '../exceptions/bad-request.exception';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreference.name)
    private userPreferenceModel: Model<UserPreferenceDocument>,
  ) {}

  async create(
    createUserPreferenceDto: CreateUserPreferenceDto,
  ): Promise<UserPreference> {
    try {
      const createdPreference = new this.userPreferenceModel(
        createUserPreferenceDto,
      );
      return await createdPreference.save();
    } catch (error) {
      throw new BadRequestException(
        `Failed to create user preference. Please check the provided data. ${error.message}`,
      );
    }
  }

  async findOne(userId: string): Promise<UserPreference> {
    const userPreference = await this.userPreferenceModel
      .findOne({ userId })
      .exec();
    if (!userPreference) {
      throw new NotFoundException(
        `User preference not found for userId: ${userId}`,
      );
    }
    return userPreference;
  }

  async update(
    userId: string,
    updateUserPreferenceDto: UpdateUserPreferenceDto,
  ): Promise<UserPreference> {
    const updatedPreference = await this.userPreferenceModel
      .findOneAndUpdate({ userId }, updateUserPreferenceDto, { new: true })
      .exec();
    if (!updatedPreference) {
      throw new NotFoundException(
        `Cannot update. User preference not found for userId: ${userId}`,
      );
    }
    return updatedPreference;
  }

  async remove(userId: string): Promise<void> {
    const result = await this.userPreferenceModel.deleteOne({ userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        `Cannot delete. User preference not found for userId: ${userId}`,
      );
    }
  }
}
