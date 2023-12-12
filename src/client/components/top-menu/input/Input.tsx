import type { HTMLInputTypeAttribute } from 'react';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

export interface InputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  className?: string;
  topLeftLabel?: string;
  topRightLabel?: string;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
  type?: HTMLInputTypeAttribute;
}

export const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const {
    field: { ref, value, onChange, ...otherFieldProps },
    fieldState,
  } = useController(props);

  console.log(otherFieldProps.name, fieldState.error?.message);

  return (
    <div className="form-control w-full max-w-xs">
      <div className="label  pt-0">
        <span className="label-text">{props.topLeftLabel}</span>
        <span className="label-text-alt">{props.topRightLabel}</span>
      </div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="input input-bordered w-full max-w-xs"
        value={value}
        ref={ref}
        {...otherFieldProps}
      />
      <div className="label">
        <span className="label-text-alt" />
        <span className="label-text-alt text-error">
          {fieldState?.error?.message}
        </span>
      </div>
    </div>
  );
};
