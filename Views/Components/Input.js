import React from 'react';
import {FormControl, Input} from 'native-base';
import {Controller} from 'react-hook-form';

const FormInput = ({
  placeholder = '',
  defaultValue = '',
  rules = {},
  name = '',
  required = true,
  label = '',
  control = () => {},
  errors = {},
  type = 'text',
  Component = null,
  disabled = false,
}) => {
  return (
    <FormControl
      isRequired={required}
      isInvalid={errors && `${name}` in errors}
      mb={3}>
      <FormControl.Label _text={{bold: true}}>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) =>
          Component ? (
            <Component
              onBlur={onBlur}
              placeholder={placeholder}
              onChangeText={val => onChange(val)}
              value={value}
              type={type}
            />
          ) : (
            <Input
              onBlur={onBlur}
              placeholder={placeholder}
              onChangeText={val => onChange(val)}
              value={value}
              type={type}
              disabled={disabled}
            />
          )
        }
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      <FormControl.ErrorMessage>
        {errors && errors[name]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default FormInput;
