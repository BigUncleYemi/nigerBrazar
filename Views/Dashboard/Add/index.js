/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {
  CheckIcon,
  View,
  VStack,
  ScrollView,
  Select,
  Button,
  FormControl,
  Divider,
} from 'native-base';
import {useQueryClient} from 'react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import * as ImagePicker from 'react-native-image-picker';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {SliderBox} from 'react-native-image-slider-box';
import FormInput from '../../Components/Input';
import useGetCategories from '../../../Hooks/useGetCategories';
import useGetSubCategories from '../../../Hooks/useGetSubCategories';
import geodata from '../../../niger_city_data.json';
import Utils from '../../../utils';
import Header from '../../Components/Header';
import usePostAdvert from '../../../Hooks/usePostAdvert';
import requireAuth from '../../../Hoc/requireAuth';

const width = Dimensions.get('screen').width;

const schema = yup.object().shape({
  category: yup.string().required(),
  subCategory: yup.string().required(),
});

const AddUIScreen = props => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    register,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const postAdvert = usePostAdvert(reset);
  const user = queryClient.getQueryData('CURRENT_USER');
  const [sudId, setSubId] = useState('');
  const [full, setFull] = useState(false);
  const [form, setForm] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [images, setImages] = useState([]);
  const [response, setResponse] = React.useState([]);
  const {data = []} = useGetCategories();

  async function submitHandler(data) {
    setDisabled(false);
    console.log(
      JSON.stringify({
        ...data,
        meta: data.meta.map((item, index) => ({
          ...item,
          name: {...form?.form[index].name},
        })),
        price: {
          ...data.price,
          currency: 'CFA',
          contactForPrice: true,
        },
      }),
    );
    postAdvert.mutate({
      ...data,
      meta: data.meta.map((item, index) => ({
        ...item,
        name: form?.form[index].name,
      })),
      price: {
        ...data.price,
        currency: 'CFA',
        contactForPrice: true,
      },
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit = React.useCallback(async formData => {
    if (response.length === 0) {
      // eslint-disable-next-line no-alert
      return alert('Please Upload at least one picture');
    }
    setDisabled(true);
    await response.forEach(async (payload, index) => {
      const uri = payload.uri;
      const type = payload.type;
      const name =
        payload.fileName ||
        payload.uri.substr(payload.uri.lastIndexOf('/') + 1);
      const source = {
        uri,
        type,
        name,
      };
      const resp = await Utils.cloudinaryUpload(source);
      setImages([...images, resp.secure_url]);
      if (index + 1 === response.length) {
        return submitHandler({
          ...formData,
          images: [...images, resp.secure_url],
        });
      }
    });
  });

  const handleRes = async res => {
    // console.log(res, 'hgfds'); //TODO: check ios implemetation
    if (res.didCancel) {
      //console.log('User cancelled image picker');
    } else if (res.errorMessage) {
      //console.log('ImagePicker Error: ', res.errorMessage);
    } else {
      setResponse(res.assets);
    }
  };

  const onUploadButtonPress = () => {
    ImagePicker.launchImageLibrary(
      {
        title: 'Select Photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        selectionLimit: 3,
        mediaType: 'photo',
        includeBase64: false,
      },
      handleRes,
    );
  };

  return (
    <ScrollView style={{flex: 1, paddingTop: insets.top}} bounce={false}>
      <VStack>
        <Header
          title={'Post Advert'}
          onPressAction={() => props.navigation.goBack()}
        />
        <VStack p={4} px={6} bg={'white'}>
          <FormInput
            name="category"
            label="Category"
            rules={{required: 'Field is required'}}
            Component={({value, onChangeText, onBlur}) => {
              return (
                <Select
                  selectedValue={value}
                  minWidth={200}
                  accessibilityLabel="Select Category"
                  placeholder="Select Category"
                  onValueChange={itemValue => {
                    onChangeText(itemValue);
                    setSubId(itemValue);
                    setFull(false);
                    setValue('subCategory', '', {shouldValidate: true});
                  }}
                  _selectedItem={{
                    bg: 'orange.600',
                    _text: {color: 'white'},
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt={1}>
                  {data?.map((item, index) => (
                    <Select.Item
                      key={index}
                      label={item?.name[user?.user?.profile?.language || 'FR']}
                      value={item?._id}
                    />
                  ))}
                </Select>
              );
            }}
            {...{control, errors}}
            {...register('category')}
          />
          {!!sudId && (
            <FormInput
              name="subCategory"
              label="Subcategory"
              rules={{required: 'Field is required'}}
              Component={({value, onChangeText, onBlur}) => {
                const {data = {subCategories: []}, isLoading} =
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  useGetSubCategories(sudId);
                return (
                  <Select
                    selectedValue={value}
                    minWidth={200}
                    accessibilityLabel="Select Subcategory"
                    placeholder={isLoading ? 'Loading..' : 'Select Subcategory'}
                    onValueChange={itemValue => {
                      onChangeText(itemValue);
                      setFull(true);
                      if (data?.subCategories) {
                        return setForm(
                          data?.subCategories?.filter(
                            item => item._id === itemValue,
                          )[0] || {},
                        );
                      }
                      return setForm(itemValue);
                    }}
                    _selectedItem={{
                      bg: 'orange.600',
                      _text: {color: 'white'},
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt={1}>
                    {data?.subCategories?.map((item, index) =>
                      item?.name ? (
                        <Select.Item
                          key={index}
                          label={
                            item?.name[user?.user?.profile?.language || 'FR']
                          }
                          value={item._id}
                        />
                      ) : null,
                    )}
                    <Select.Item label="Other" value="null" />
                  </Select>
                );
              }}
              {...{control, errors}}
              {...register('subCategory')}
            />
          )}
          {full && (
            <React.Fragment>
              <FormInput
                name="name"
                label="Name"
                rules={{required: 'Field is required'}}
                {...{control, errors}}
                {...register('name')}
              />
              <FormInput
                name="description"
                label="Description"
                rules={{required: 'Field is required'}}
                {...{control, errors}}
                inputType="textarea"
                {...register('description')}
              />
              {form?.form?.map((item, index) => {
                return (
                  <FormInput
                    key={index}
                    name={item?.name[user?.user?.profile?.language || 'FR']}
                    label={item?.name[user?.user?.profile?.language || 'FR']}
                    inputType={item?.type}
                    type={item?.type}
                    selectItem={item?.properties?.map(it => ({
                      name: it?.property_name[
                        user?.user?.profile?.language || 'FR'
                      ],
                      value: it?.value,
                    }))}
                    rules={{required: 'Field is required'}}
                    hintText={item.hint}
                    {...register(`meta.${index}.value`)}
                    {...{control, errors}}
                  />
                );
              })}
              <FormInput
                name="amount"
                label="Amount"
                {...register('price.amount')}
                inputType="currency"
                rules={{required: 'Field is required'}}
                {...{control, errors}}
              />
              <FormInput
                name="negotiable"
                label="Negotiable"
                {...register('price.negotiable')}
                rules={{required: 'Field is required'}}
                Component={({value, onChangeText, onBlur}) => {
                  return (
                    <Select
                      selectedValue={value}
                      minWidth={200}
                      accessibilityLabel="Select Negotiable"
                      placeholder="Select Negotiable"
                      onValueChange={itemValue => {
                        onChangeText(itemValue);
                      }}
                      _selectedItem={{
                        bg: 'orange.600',
                        _text: {color: 'white'},
                        endIcon: <CheckIcon size={5} />,
                      }}
                      mt={1}>
                      <Select.Item label="Yes" value={true} />
                      <Select.Item label="No" value={false} />
                    </Select>
                  );
                }}
                {...{control, errors}}
              />
              <FormControl mt={2}>
                <FormControl.Label _text={{bold: true}}>
                  Upload Image
                </FormControl.Label>
                <View
                  mt={3}
                  height={220}
                  alignItems="center"
                  style={{borderWidth: 1, borderColor: '#e5e5e5'}}>
                  <SliderBox
                    images={response}
                    sliderBoxHeight={220}
                    ImageComponentStyle={{
                      borderRadius: 15,
                      width: '90%',
                      marginTop: 5,
                      margin: 'auto',
                    }}
                    parentWidth={width}
                    resizeMethod={'resize'}
                    resizeMode={'cover'}
                    onCurrentImagePressed={index =>
                      console.warn(`image ${index} pressed`)
                    }
                  />
                </View>
              </FormControl>
              <Button
                _text={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
                onPress={() => onUploadButtonPress()}
                mt={5}
                mb={3}
                isDisabled={disabled || postAdvert.status === 'loading'}
                colorScheme="orange">
                Upload Image
              </Button>

              <FormInput
                name="city"
                label="City"
                rules={{required: 'Field is required'}}
                {...{control, errors}}
                {...register('address.city')}
              />
              <FormInput
                name="state"
                label="State"
                rules={{required: 'Field is required'}}
                Component={({value, onChangeText, onBlur}) => {
                  return (
                    <Select
                      selectedValue={value}
                      minWidth={200}
                      accessibilityLabel="Select State"
                      placeholder="Select State"
                      onValueChange={itemValue => {
                        onChangeText(itemValue);
                      }}
                      _selectedItem={{
                        bg: 'orange.600',
                        _text: {color: 'white'},
                        endIcon: <CheckIcon size={5} />,
                      }}
                      mt={1}>
                      {[...new Set(geodata.map(item => item.admin_name))]?.map(
                        (item, index) =>
                          item ? (
                            <Select.Item
                              key={index}
                              label={item}
                              value={item.toLowerCase()}
                            />
                          ) : null,
                      )}
                    </Select>
                  );
                }}
                {...{control, errors}}
                {...register('address.state')}
              />
              <FormInput
                name="country"
                label="Country"
                rules={{required: 'Field is required'}}
                Component={({value, onChangeText, onBlur}) => {
                  return (
                    <Select
                      selectedValue={value}
                      minWidth={200}
                      accessibilityLabel="Select Country"
                      placeholder="Select Country"
                      onValueChange={itemValue => {
                        onChangeText(itemValue);
                      }}
                      _selectedItem={{
                        bg: 'orange.600',
                        _text: {color: 'white'},
                        endIcon: <CheckIcon size={5} />,
                      }}
                      mt={1}>
                      <Select.Item label="Niger" value="Niger" />
                    </Select>
                  );
                }}
                {...{control, errors}}
                {...register('address.country')}
              />
              <Divider />
              <Button
                _text={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
                onPress={handleSubmit(onSubmit)}
                mt={5}
                // isLoading={disabled || postAdvert.status === 'loading'}
                // isDisabled={disabled || postAdvert.status === 'loading'}
                isLoadingText={'Posting...'}
                colorScheme="orange">
                {/* {t('registerBtnText')} */}
                Submit Advert
              </Button>
            </React.Fragment>
          )}
        </VStack>
        <View pb={3} />
      </VStack>
    </ScrollView>
  );
};

export default requireAuth(AddUIScreen);
