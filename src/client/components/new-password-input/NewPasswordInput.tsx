import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

export interface NewPasswordInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  className?: string;
  topLeftLabel?: string;
  topRightLabel?: string;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
}

export const NewPasswordInput = <T extends FieldValues>(
  props: NewPasswordInputProps<T>,
) => {
  const {
    field: { ref, value, onChange, ...otherFieldProps },
    fieldState,
  } = useController(props);

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((value) => !value);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="form-control w-full">
      <div className="label pt-0">
        <span className="label-text">{props.topLeftLabel}</span>
        <span className="label-text-alt">{props.topRightLabel}</span>
      </div>
      <motion.div whileTap={{ scale: 1.005 }} className="flex flex-row">
        <input
          type={visible ? 'text' : 'password'}
          className={`input input-bordered w-full pr-14 ${
            fieldState?.error ? 'border-2 border-red-400' : ''
          }`}
          placeholder={props.placeholder}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
          ref={ref}
          {...otherFieldProps}
        />
        <Icon
          icon={visible ? 'mdi:eye' : 'mdi:eye-off'}
          onClick={toggleVisibility}
          className="-ml-12 mt-1 h-10 w-10 cursor-pointer border-l-2 border-gray-600 pl-2"
        />
      </motion.div>
      <div className="label">
        <span className="label-text-alt" />
        <span className="label-text-alt text-error">
          {fieldState?.error?.message}
        </span>
      </div>
    </label>
  );
};
