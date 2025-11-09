import React, { useState } from "react";
import {View, TextInput, Button, StyleSheet,Text} from "react-native";
import {db} from "../database/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";


const FormularioClientes =({ cargarDatos }) =>{
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  

  const guardarCliente = async () =>{
    if(nombre && apellido && edad) {
      try {
        await addDoc(collection(db, "clientes"),{
          nombre: nombre,
          apellido: apellido,
          edad: edad,
          
        });
        setNombre("");
        setApellido("");
        setEdad("");
        cargarDatos("");
      }catch (error){
        console.error("Error al registrar cliente:", error);
      }
      
    }else{
      alert("Por favor, complete todos los campos")
    }
  };

  return(
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Clientes</Text>

      <TextInput 
      style={styles.input}
      placeholder="Nombre del cliente"
      placeholderTextColor="#888"
      value={nombre} 
      onChangeText={setNombre}/>

      <TextInput 
      style={styles.input}
      placeholder="Apellido"
      placeholderTextColor="#888"
      value={apellido} 
      onChangeText={setApellido}/>

      <TextInput 
      style={styles.input}
      placeholder="Edad"
      placeholderTextColor="#888"
      value={edad} 
      onChangeText={setEdad}
      keyboardType="numeric"/>


      <Button title="Guardar" onPress={guardarCliente}/>
    </View>
  )
};

const styles= StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    margin: 10,
  },
  titulo:{
    fontSize: 22,
    fontWeight: "bold",
    marginBottom:10,
    color: '#ffffff' 
  },
  input:{
    borderWidth: 1,
    borderColor: "#3d3d5c",
    padding:10,
    marginBottom: 10,
    color: '#ffffff',  
    backgroundColor: '#2d2d44',  
    borderRadius: 8,
  },
})

export default FormularioClientes;