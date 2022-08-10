import DropDownPicker from 'react-native-dropdown-picker';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/styles';
import {fetchBreed} from '../../utils/profile';

const SearchBreed = ({setBreed}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {breedId: 1, breedName: '푸들'},
    {breedId: 2, breedName: '보더콜리'},
    {breedId: 3, breedName: '비숑'},
    {breedId: 4, breedName: '포메라니안'},
    {breedId: 5, breedName: '도베르만'},
  ]);

  const onChangeValue = val => {
    setBreed(val);
  };

  useEffect(() => {
    const fetchValue = async () => {
      const res = await fetchBreed();
      setItems(res);
      // console.log(res);
      return res;
    };

    fetchValue();
    // console.log(items);
  }, []);

  return (
    <DropDownPicker
      placeholder="견종"
      placeholderStyle={{
        textAlign: 'center',
        color: '#6D6D6D',
      }}
      schema={{
        label: 'breedName',
        value: 'breedName',
      }}
      open={open}
      value={value}
      items={items}
      itemKey="breedId"
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={styles.input}
      onChangeValue={onChangeValue}
      containerStyle={styles.containerStyle}
    />
  );
};

export default SearchBreed;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginLeft: 3,
  },
  input: {
    // maxWidth: '70%',
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.ProfileInputBorder,
    backgroundColor: Colors.ProfileInputBorder,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 12,
  },
});
