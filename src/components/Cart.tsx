import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import TouchableButton from './utils/TouchableButton';
import { getDataItem } from '../helpers/storageHelper';
import { useFocusEffect } from '@react-navigation/native';

const Item = ({nombre, precio, categoria}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{nombre} {precio} {categoria}</Text>
    </View> 
);

function Cart({ route, navigation }) {
  const [products, setProducts] = useState([]);
  const [selectedproducts, setSelectedproducts] = useState([]);
  const { items } = route.params;

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  useEffect(() => {
    const itemProducts = products.filter(objeto => items.includes(objeto.id));
    setSelectedproducts(itemProducts);
  }, [products]);

  const getData = async () => {
    const valueJSON = await getDataItem('PRODUCTS');
    const productsList = JSON.parse(valueJSON);
    setProducts(productsList);
  };

  const cleanCart = async () => {
    navigation.navigate('Productos', {cleanProducts: true});
  };
  return (
    <View style={styles.container}>
        <FlatList data={selectedproducts} 
        renderItem={({item}) => <Item nombre={item.nombre} precio={item.precio} categoria={item.categoria} />}
        keyExtractor={item => item.id} >  
      </FlatList>
      <TouchableButton text="Vaciar Carrito" onPress={() => cleanCart()} bgColor="#C20300"></TouchableButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 15,
    color: '#000559'
  },
  button: {

  }
});

export default Cart;