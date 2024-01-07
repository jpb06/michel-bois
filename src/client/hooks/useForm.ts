import type { DefaultValues, Resolver } from 'react-hook-form';
import { useRemixForm } from 'remix-hook-form';

export const useForm = <FieldValues extends Record<string, unknown>>(
  resolver: Resolver<FieldValues>,
  defaultValues: DefaultValues<FieldValues> | undefined = undefined,
) => {
  const { handleSubmit, control, watch } = useRemixForm<FieldValues>({
    shouldFocusError: true,
    mode: 'onSubmit',
    resolver,
    defaultValues,
  });

  return {
    onSubmit: handleSubmit,
    control,
    watch,
  };
};
