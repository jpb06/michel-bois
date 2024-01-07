import { Link, useSearchParams } from '@remix-run/react';

export const SignupLink = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="text-center text-sm text-gray-500">
      Don&apos;t have an account?{' '}
      <Link
        className="text-blue-500 underline"
        to={{
          pathname: '/signup',
          search: searchParams.toString(),
        }}
      >
        Sign up
      </Link>
    </div>
  );
};
