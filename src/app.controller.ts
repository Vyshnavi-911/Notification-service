// src/app.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getWelcomeMessage(): string {
    return 'Welcome to Notification service!';
  }
}
