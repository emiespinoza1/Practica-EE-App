import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { db } from "../database/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioEdades = ({ cargarDatos }) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");

  const guardarEdad = async () => {
    if (nombre.trim() && edad.trim()) {
      try {
        await addDoc(collection(db, "edades"), { 
          nombre: nombre.trim(),
          edad: parseInt(edad),
        });
        setNombre("");
        setEdad("");
        cargarDatos();
      } catch (error) {
        console.error("Error al guardar la edad: ", error);
      }
    } else {
      Alert.alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Edades</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#888"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        placeholderTextColor="#888"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />
      <Button title="Guardar" onPress={guardarEdad} />
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
    color: '#ffffff'
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

export default FormularioEdades;