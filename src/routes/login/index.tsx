import { Form, useSearchParams } from '@remix-run/react';
import { json, redirect } from '@remix-run/server-runtime';
import { Effect, pipe } from 'effect';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import { Button, Input } from '@client/components';
import { safeRedirect } from '@client/logic';
import { createUserSession, getUserId, verifyLoginTask } from '@domains/auth';
import { effectAction, effectLoader, handleForm } from '@effects';
import { PrismaDatabaseLayerLive } from '@layers';

import { LoginIconStatus } from './children/LoginIconStatus';
import { useCloseToastOnInputChange } from './hooks/useCloseToastOnInputChange';
import { useLoginErrorToast } from './hooks/useLoginErrorToast';
import { useLoginForm } from './hooks/useLoginForm';
import type { LoginForm } from './logic/login-form.logic';
import { loginFormResolver } from './logic/login-form.logic';

export const loader = effectLoader((request) =>
  pipe(
    Effect.gen(function* (_) {
      const userId = yield* _(getUserId(request));
      if (userId) {
        return redirect('/');
      }

      return json({});
    }),
  ),
);

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
    Effect.delay(1000),
  ),
);

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/documents';

  const { watch, control, onSubmit } = useLoginForm();
  useCloseToastOnInputChange(watch);
  useLoginErrorToast();

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
        transition={{
          duration: 0.3,
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }}
      >
        <Form
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
          <div className="w-full text-right">
            <Button className="btn-accent">Login</Button>
          </div>
        </Form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
