import React, {useRef} from 'react';
import {CheckIcon, FormControl, Input, Select, TextArea} from 'native-base';
import CurrencyInput from 'react-native-currency-input';
import {Controller} from 'react-hook-form';
import MultiSelect from 'react-native-multiple-select';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
  selectItem = [],
  inputType = 'input',
  isLoading = false,
  Children,
  hintText = '',
}) => {
  // const multiSelect = useRef(null);
  return (
    <FormControl
      isRequired={required}
      isInvalid={errors && `${name}` in errors}
      mb={3}
      mt={2}>
      <FormControl.Label _text={{bold: true}}>
        {capitalizeFirstLetter(label)}
      </FormControl.Label>
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
          ) : inputType === 'multi-choice' ? (
            <MultiSelect
              hideTags
              items={selectItem}
              uniqueKey="value"
              // ref={multiSelect}
              onSelectedItemsChange={val => onChange(val)}
              selectedItems={value}
              selectText="Select Items"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={text => console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              styleMainWrapper={{
                color: '#000',
                paddingLeft: 13,
                paddingRight: 13,
                borderRadius: 6,
                borderColor: '#e5e5e5',
                borderWidth: 1,
                fontSize: 16,
              }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
          ) : inputType === 'textarea' ? (
            <TextArea
              h={20}
              mt={1}
              p={3}
              value={value}
              onBlur={onBlur}
              placeholder={placeholder}
              onChangeText={val => onChange(val)}
              value={value}
              type={type}
              disabled={disabled}
            />
          ) : inputType === 'currency' ? (
            <CurrencyInput
              placeholder={placeholder}
              onChangeValue={formattedValue => {
                onChange(formattedValue); // $2,310.46
              }}
              value={value}
              type={type}
              disabled={disabled}
              delimiter=","
              separator="."
              precision={2}
              style={{
                color: '#000',
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 6,
                borderColor: '#e5e5e5',
                borderWidth: 1,
                fontSize: 16,
              }}
            />
          ) : inputType === 'select' ? (
            <Select
              selectedValue={value}
              minWidth={200}
              placeholder={isLoading ? 'Loading..' : placeholder}
              onValueChange={itemValue => {
                onChange(itemValue);
              }}
              _selectedItem={{
                bg: 'orange.600',
                _text: {color: 'white'},
                endIcon: <CheckIcon size={5} />,
              }}
              mt={1}>
              {selectItem?.map((item, index) =>
                item?.name ? (
                  <Select.Item
                    key={index}
                    label={item?.name}
                    value={item.value}
                  />
                ) : null,
              )}
            </Select>
          ) : (
            <Input
              onBlur={onBlur}
              placeholder={placeholder}
              onChangeText={val => onChange(val)}
              value={value}
              type={type}
              keyboardType={inputType === 'number' ? 'number-pad' : 'default'}
              disabled={disabled}
            />
          )
        }
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      {hintText && <FormControl.HelperText>{hintText}</FormControl.HelperText>}
      <FormControl.ErrorMessage>
        {errors && errors[name]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default FormInput;
