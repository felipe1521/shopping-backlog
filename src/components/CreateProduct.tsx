import { Picker } from '@react-native-picker/picker';
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, Alert, StatusBar } from 'react-native';
import { getDataItem, storeData } from '../helpers/storageHelper';
import TouchableButton from './utils/TouchableButton';
import { useFocusEffect } from '@react-navigation/native';

const CATEGORIES: string[] = [
  "Frutas",
  "Verduras",
  "Carnes",
  "Pescado y mariscos",
  "Lácteos",
  "Panadería",
  "Cereales y granos",
  "Huevos",
  "Productos congelados",
  "Bebidas",
  "Snacks y aperitivos",
  "Alimentos enlatados",
  "Condimentos y salsas",
  "Dulces y chocolates",
  "Alimentos para mascotas",
  "Aceites y vinagres",
  "Especias y hierbas",
  "Alimentos internacionales"
];

function CreateProduct({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIES[0]);
  const [missingData, setMissingData] = useState('');

  useFocusEffect(
    useCallback(() => {
      return () => {
        setNombre('');
        setPrecio('');
        setCategoria(CATEGORIES[0]);
      };    
    }, [])
  );

  const categories = CATEGORIES.map(category => {
    return (<Picker.Item key={category} label={category} value={category} />)
  });

  const saveData = async () => {
    const product = {
      id: generateRandomID(), 
      nombre: nombre.trim(), 
      precio: precio, 
      categoria: categoria
    };
    const valueJSON = await getDataItem('PRODUCTS');
    const productsList = JSON.parse(valueJSON);
    productsList.push(product);
    await storeData('PRODUCTS', JSON.stringify(productsList));
    navigation.navigate('Productos');
  };

  const handleChangeNombre = (input: string) => setNombre(input); 
  const handleChangePrecio = (input: string) => setPrecio(input);
  const handleChangeCategoria = (input: string) => setCategoria(input);

  const validateData = () => {
    if(!nombre || !precio || !categoria) {
      setMissingData('Faltan datos que rellenar, favor revisar.');
    } else {
      setMissingData('');
      handleConfirm();
    }
  }

  const handleConfirm = () => {
    Alert.alert(
      'Confirmar',
      `¿Estás seguro de que deseas agregar el siguiente producto?\n
      Nombre: ${nombre}
      Precio: ${precio}
      Categoria: ${categoria}`,
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelado'),
          style: 'cancel',
        }, 
        {
          text: 'Aceptar',
          onPress: () => saveData(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Producto</Text>
      <TextInput style={styles.input} 
        placeholder="Nombre..." placeholderTextColor="#000559"
        onChangeText={handleChangeNombre}
        value={nombre}></TextInput>
      <TextInput style={styles.input} 
        placeholder="Precio..." placeholderTextColor="#000559" keyboardType="numeric"
        onChangeText={handleChangePrecio}
        value={precio}></TextInput>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={categoria}
          onValueChange={handleChangeCategoria} >
          {categories}
        </Picker>
      </View>
      <TouchableButton text="Guardar" onPress={validateData} bgColor="#000559"></TouchableButton>
      <Text style={{color: 'red', paddingVertical: 20, textAlign: 'center'}}>{missingData}</Text>
      <StatusBar />
    </View>
  )
}

function generateRandomID(): string {
  let cadena = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const longitud = 8;
  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    cadena += caracteres.charAt(indiceAleatorio);
  }
  return cadena;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    marginTop: 10
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000559',
    marginVertical: 20
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: '#000559',
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    color: '#000559',
  },
  pickerContainer: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#000559',
    marginBottom: 30
  },
  picker: {
    height: 50,
    color: '#000559'
  }
});

export default CreateProduct;