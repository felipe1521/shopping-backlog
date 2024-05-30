import { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { storeData } from '../../helpers/storageHelper';

function ProductItem({ nombre, categoria, products, setProducts }) {
    const [textColor, setTextColor] = useState('white');

    const buttonOnPress = async (nombre: any) => {
      const newProduct = products.findIndex(prod => prod.nombre === nombre);
      products[newProduct].comprado = !products[newProduct].comprado;
      if(products[newProduct].comprado) setTextColor('green');
      else setTextColor('white');
      setProducts(products);
      await storeData('PRODUCTS', JSON.stringify(products));
  };
    return (
    <View style={[styles.item, {backgroundColor: textColor}]}>
      <TouchableOpacity onPress={() => buttonOnPress(nombre)}>
        <Text style={styles.itemText}>{nombre}  -   {categoria}</Text>
      </TouchableOpacity>
    </View> 
    );
}

const styles = StyleSheet.create({
    item: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 1
    },
    itemText: {
      fontSize: 15,
      color: '#000559'
    }
  });

export default ProductItem;