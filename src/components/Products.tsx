import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, StatusBar } from 'react-native';
import { getDataItem } from '../helpers/storageHelper';
import TouchableButton from './utils/TouchableButton';
import { useFocusEffect } from '@react-navigation/native';

function Products({ route, navigation }) {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  useEffect(() => {
    setSelectedItems([]);
  }, [route.params]);

  const getData = async () => {
    const valueJSON = await getDataItem('PRODUCTS');
    const productsList = JSON.parse(valueJSON);
    setProducts(productsList);
  };

  const toggleSelection = (itemID: any) => {
    if (selectedItems.includes(itemID)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemID));
    } else {
      setSelectedItems([...selectedItems, itemID]);
    }
  };
  const renderItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity
        onPress={() => toggleSelection(item.id)}
        style={[styles.item, { backgroundColor: isSelected ? 'green' : 'white' }]} >
        <Text style={styles.itemText}>{item.nombre}</Text>
        <Text style={styles.itemText}>({item.categoria})</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableButton text="Ver Carrito" 
      onPress={() => navigation.navigate('Cart', {items: selectedItems})} bgColor="#000559"></TouchableButton>
      <FlatList data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} >  
      </FlatList>
      <StatusBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 20,
    color: '#000559'
  }
});

export default Products;