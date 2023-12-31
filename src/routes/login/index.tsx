import { Form } from '@remix-run/react';
import { json } from '@remix-run/server-runtime';
import { Effect, pipe } from 'effect';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import { Button, Input } from '@client/components';
import { useForm, useRedirectTo } from '@client/hooks';
import { safeRedirect } from '@client/logic';
import { defaultTransition } from '@client/motion';
import {
  createUserSession,
  verifyLoginTask,
  redirectLoggedUser,
} from '@domains/auth';
import { effectAction, effectLoader, handleForm } from '@effects';
import { PrismaDatabaseLayerLive } from '@layers';

import { LoginIconStatus } from './children/LoginIconStatus';
import { SignupLink } from './children/SignupLink';
import { useCloseToastOnInputChange } from './hooks/useCloseToastOnInputChange';
import { useLoginErrorToast } from './hooks/useLoginErrorToast';
import { type LoginForm, loginFormResolver } from './logic/login-form.logic';

export const loader = effectLoader(redirectLoggedUser);

export const action = effectAction(({ request }) =>
  pipe(
    Effect.gen(function* (_) {
      const {
        data: { email, password, redirectTo },
        defaultValues,
      } = yield* _(handleForm<LoginForm>(request, loginFormResolver));

      const user = yield* _(verifyLoginTask(email, password));
      if (!user) {
        return json({
          id: uuid(),
          formError: 'Invalid email or password',
          defaultValues,
        });
      }

      return yield* _(
        createUserSession({
          redirectTo: safeRedirect(redirectTo, '/'),
          request,
          userId: user.id,
        }),
      );
    }),
    Effect.provide(PrismaDatabaseLayerLive),
  ),
);

const LoginPage = () => {
  const { watch, control, onSubmit } = useForm<LoginForm>(loginFormResolver, {
    email: '',
    password: '',
  });
  useCloseToastOnInputChange(watch);
  useLoginErrorToast();
  const redirectTo = useRedirectTo();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {
    toast.dismiss();
    onSubmit();
  };

  return (
    <div className="flex min-h-[calc(100%-60px)] w-full flex-col justify-center">
      <motion.div
        className="mx-auto w-full max-w-md rounded-2xl border border-sky-400 bg-sky-900 p-2 px-8 opacity-90"
        whileHover={{ scale: 1.009 }}
        whileTap={{ scale: 1.003 }}
        transition={defaultTransition}
      >
        <Form
          method="post"
          action="/login"
          onSubmit={handleSubmit}
          className="flex flex-col items-center py-6"
        >
          <h1 className="prose prose-2xl mb-1 w-full text-center text-teal-600">
            Login
          </h1>
          <LoginIconStatus />
          <Input topLeftLabel="Email" name="email" control={control} />
          <Input
            topLeftLabel="Password"
            type="password"
            name="password"
            control={control}
          />
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="flew-row flex w-full items-center justify-between">
            <SignupLink />
            <Button className="btn-accent">Login</Button>
          </div>
        </Form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
