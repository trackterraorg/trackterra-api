import { Injectable } from '@nestjs/common';

@Injectable()
export class CookieSerializer {
  serializeUser(user: any, done: (a: any, b: any) => void): any {
    done(null, user);
  }

  deserializeUser(payload: any, done: (a: any, b: any) => void): any {
    done(null, payload);
  }
}
