import { useCurrentRoute } from '../../../hooks';

export const PageTitle = () => {
  const currentRoute = useCurrentRoute();

  return (
    <div className="absolute left-4 top-4">
      <p className="text-4xl text-white underline decoration-indigo-500 decoration-4">
        {currentRoute}
      </p>
    </div>
  );
};
