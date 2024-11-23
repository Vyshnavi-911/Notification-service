// src/user-preferences/user-preferences.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferencesService } from './user-preferences.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserPreference } from '../schemas/user-preference.schema';
import { Model } from 'mongoose';

describe('UserPreferencesService', () => {
  let service: UserPreferencesService;
  let model: Model<UserPreference>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferencesService,
        {
          provide: getModelToken(UserPreference.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<UserPreferencesService>(UserPreferencesService);
    model = module.get<Model<UserPreference>>(getModelToken(UserPreference.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more unit tests here
});
