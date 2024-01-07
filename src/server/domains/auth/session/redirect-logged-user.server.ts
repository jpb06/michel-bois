import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { Effect } from 'effect';

import { getUserId } from './get-user-id.server';

export const redirectLoggedUser = (request: LoaderFunctionArgs['request']) =>
  Effect.gen(function* (_) {
    const userId = yield* _(getUserId(request));
    if (userId) {
      return redirect('/');
    }

    return json({});
  });
