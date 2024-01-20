import { motion } from 'framer-motion';
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

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="form-control w-full">
      <div className="label -m-1">
        <span
          className={`label-text ${fieldState?.error ? 'text-error' : 'text-accent'}`}
        >
          {props.topLeftLabel}
        </span>
        <span className="label-text-alt">{props.topRightLabel}</span>
      </div>
      <motion.input
        whileTap={{ scale: 1.005 }}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={`input input-bordered  w-full ${
          fieldState?.error ? 'input-error' : 'input-accent'
        }`}
        value={value}
        ref={ref}
        {...otherFieldProps}
      />
      <div className="label -m-1">
        <span className="label-text-alt" />
        <span className="label-text-alt text-error">
          {fieldState?.error?.message}
        </span>
      </div>
    </label>
  );
};
