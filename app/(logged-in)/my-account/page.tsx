import { auth } from '@/auth';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import db from '@/db/drizzle';
import { users } from '@/db/userSchema';
import { Label } from '@radix-ui/react-label';
import { eq } from 'drizzle-orm';
import React from 'react';
import TwoFactorAuthForm from './two-factor-auth-form';

export default async function MyAccount() {
  const session = await auth();

  // gives props about user

  const [user] = await db
    .select({
      twoFactorActivated: users.twoFactorActivated,
    })
    .from(users)
    .where(eq(users.id, parseInt(session?.user?.id!)));

  return (
    <Card className='w-[350px]'>
      <CardHeader>My Accaunt</CardHeader>
      <CardContent>
        <Label>Email Address</Label>
        <div className='text-muted-foreground'>{session?.user?.email}</div>
        {/* Two Factor Auth Form */}
        <TwoFactorAuthForm
          twoFactorActivated={user.twoFactorActivated ?? false}
        />
      </CardContent>
    </Card>
  );
}
