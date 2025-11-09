import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";

const FormularioProductos = ({ 
  nuevoProducto,
  manejoCambio,
  guardarProducto,
  actualizarProducto,
  modoEdicion
}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {modoEdicion ? "Actualizar Producto" : "Registro de Producto"}
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        placeholderTextColor="#888"
        value={nuevoProducto.nombre}
        onChangeText={(nombre) => manejoCambio("nombre", nombre)}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        placeholderTextColor="#888"
        value={nuevoProducto.precio}
        onChangeText={(precio) => manejoCambio("precio", precio)}
        keyboardType="numeric"
      />

      <Button
        title={modoEdicion ? "Actualizar" : "Guardar"}
        onPress={modoEdicion ? actualizarProducto : guardarProducto}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    margin: 10,
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: "bold",  
    marginBottom: 10, 
    color: '#ffffff',
    textAlign: 'center',
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#3d3d5c",  
    padding: 10, 
    marginBottom: 10, 
    color: '#ffffff',
    backgroundColor: '#2d2d44',  
    borderRadius: 8,
  },
});

export default FormularioProductos;