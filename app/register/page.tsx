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
import { passwordMatchSchema } from '@/validation/passwordMatchSchema';
import { registerUser } from './action';
import Link from 'next/link';

const formSchema = z
  .object({
    email: z.string().email(),
    //   password: z.string().min(5).max(50),
    //   passwordConfirm: z.string(),
  })
  .and(passwordMatchSchema);

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await registerUser({
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
    if (response?.error) {
      form.setError('email', {
        type: 'manual',
        message: response?.message,
      });
    }
    console.log(form.formState);
  };

  return (
    <main className='flex justify-center items-center min-h-screen'>
      {form.formState.isSubmitSuccessful ? (
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>Your account has been Created</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className='w-full'>
              <Link href='/login'>Login to your account</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Register for a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset
                  className='gap-5 flex flex-col'
                  disabled={form.formState.isSubmitting}
                >
                  {/* email field */}
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter Your Email</FormLabel>
                        <FormControl>
                          <Input placeholder='email' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* password field */}
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter Your Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='password'
                            {...field}
                            type='password'
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* confirm password field */}
                  <FormField
                    control={form.control}
                    name='passwordConfirm'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='confirm passord'
                            {...field}
                            type='password'
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit'>Register</Button>
                </fieldset>
              </form>
            </FormProvider>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
