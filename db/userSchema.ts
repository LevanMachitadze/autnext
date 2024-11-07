import { serial, pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique(),
  password: text('passwprd'),
  createAt: timestamp('created_at').defaultNow(),
  twoFactorSecret: text('2fa_secret'),
  twoFactorActivated: boolean('2fa_activated').default(false),
});
