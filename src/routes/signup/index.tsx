import { Form } from '@remix-run/react';
import { Effect, pipe } from 'effect';
import { motion } from 'framer-motion';

import { Button, Input, NewPasswordInput } from '@client/components';
import { useForm, useRedirectTo } from '@client/hooks';
import { safeRedirect } from '@client/logic';
import { defaultTransition } from '@client/motion';
import {
  createUserSession,
  createUserTask,
  redirectLoggedUser,
} from '@domains/auth';
import { effectAction, effectLoader, handleForm } from '@effects';
import { PrismaDatabaseLayerLive } from '@layers';

import type { SignupForm } from './logic/signup-form.logic';
import { signupFormResolver } from './logic/signup-form.logic';

export const loader = effectLoader(redirectLoggedUser);

export const action = effectAction(({ request }) =>
  pipe(
    Effect.gen(function* (_) {
      const { data } = yield* _(
        handleForm<SignupForm>(request, signupFormResolver),
      );

      const user = yield* _(createUserTask(data));
      return yield* _(
        createUserSession({
          redirectTo: safeRedirect(data.redirectTo, '/'),
          request,
          userId: user.id,
        }),
      );
    }),
    Effect.provide(PrismaDatabaseLayerLive),
  ),
);

const SignupPage = () => {
  const { control, onSubmit } = useForm<SignupForm>(signupFormResolver, {
    name: '',
    email: '',
    password: '',
  });
  const redirectTo = useRedirectTo();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {
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
          action="/signup"
          onSubmit={handleSubmit}
          className="flex flex-col items-center py-6"
        >
          <h1 className="prose prose-2xl mb-1 w-full text-center text-teal-600">
            Signup
          </h1>
          <Input topLeftLabel="Name" name="name" control={control} />
          <Input topLeftLabel="Email" name="email" control={control} />
          <NewPasswordInput
            control={control}
            topLeftLabel="Password"
            name="password"
          />
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="flew-row flex w-full items-end justify-between">
            <Button className="btn-accent">Create account</Button>
          </div>
        </Form>
      </motion.div>
    </div>
  );
};

export default SignupPage;
