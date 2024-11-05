'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { passwordSchema } from '@/validation/passwordSchema';
import { passwordMatchSchema } from '@/validation/passwordMatchSchema';
import { changePassword } from './action';
import { useToast } from '@/hooks/use-toast';

const formSchema = z
  .object({
    currentPassword: passwordSchema,
  })
  .and(passwordMatchSchema);

export default function ChangePasswordForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await changePassword({
      currentPassword: data.currentPassword,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
    if (response?.error) {
      form.setError('root', {
        message: response.message,
      });
    } else {
      toast({
        title: 'Password Changed',
        description: ' YOur Password Has Been Upated',
        className: 'bg-green-500 text-white',
      });
      form.reset();
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          className='gap-5 flex flex-col'
          disabled={form.formState.isSubmitting}
        >
          {/* current password field */}
          <FormField
            control={form.control}
            name='currentPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currnet Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Current Password'
                    {...field}
                    type='password'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* new password */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder='password' {...field} type='password' />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* password confirm field */}
          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password </FormLabel>
                <FormControl>
                  <Input
                    placeholder='password confirm'
                    {...field}
                    type='password'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}

          <Button type='submit'>Change Password</Button>
        </fieldset>
      </form>
    </FormProvider>
  );
}
