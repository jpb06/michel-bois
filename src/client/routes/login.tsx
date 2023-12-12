import { Input } from '@client/components/top-menu/input/Input';
import { verifyLoginTask } from '@domains/auth/verify-login/verify-login.server';
import { effectAction } from '@effect/effect-action.hof';
import { handleForm } from '@effect/handle-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrismaDatabaseLayerLive } from '@layers/database';
import { Form } from '@remix-run/react';
import { json } from '@remix-run/server-runtime';
import { Effect, pipe } from 'effect';
import { useRemixForm } from 'remix-hook-form';
import * as zod from 'zod';

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1),
});

type FormData = zod.infer<typeof schema>;

export const verifyLoginFormResolver = zodResolver(schema);

export const loader = () => json({ coool: 'cool' });

export const action = effectAction(({ request }) =>
  pipe(
    Effect.gen(function* (_) {
      const {
        data: { email, password },
        defaultValues,
      } = yield* _(handleForm<FormData>(request, verifyLoginFormResolver));

      const isValid = yield* _(verifyLoginTask(email, password));
      if (!isValid) {
        return json({ errors: 'Invalid credentials', defaultValues });
      }

      return json({ cool: 'cool' });
    }),
    Effect.provide(PrismaDatabaseLayerLive),
  ),
);

const LoginPage = () => {
  const { handleSubmit, control } = useRemixForm({
    mode: 'onSubmit',
    resolver: verifyLoginFormResolver,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="flex min-h-[calc(100%-60px)] w-full flex-col justify-center">
      <div className="mx-auto w-full max-w-lg rounded-2xl border-2 border-teal-700 bg-slate-700 p-2 px-8 opacity-60">
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col items-center py-6"
        >
          <Input topLeftLabel="Email" name="email" control={control} />
          <Input
            topLeftLabel="Password"
            type="password"
            name="password"
            control={control}
          />
          <div className="w-full max-w-xs text-right">
            <button type="submit" className="btn btn-info text-right">
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
