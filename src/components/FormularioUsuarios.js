import React from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

const FormularioUsuarios = ({ actualizarUsuario, modoEdicion, nuevoUsuario, manejoCambio, guardarUsuario }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                {modoEdicion ? "Actualizar Usuario" : "Registro de usuarios"}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del usuario"
                placeholderTextColor="#888"
                value={nuevoUsuario.nombre}
                onChangeText={(nombre) => manejoCambio("nombre", nombre)}
            />
            <TextInput
                style={styles.input}
                placeholder="correo"
                placeholderTextColor="#888"
                value={nuevoUsuario.correo}
                onChangeText={(correo) => manejoCambio("correo", correo)}
            />
             <TextInput
                style={styles.input}
                placeholder="telefono"
                placeholderTextColor="#888"
                value={nuevoUsuario.telefono}
                onChangeText={(telefono) => manejoCambio("telefono", telefono)}
            />
            <TextInput
                style={styles.input}
                placeholder="edad"
                placeholderTextColor="#888"
                value={nuevoUsuario.edad}
                onChangeText={(edad) => manejoCambio("edad", edad)}
                keyboardType="numeric"
            />

            <Button 
                title={modoEdicion ? "Actualizar" : "Guardar"}
                onPress={modoEdicion ? actualizarUsuario : guardarUsuario}   
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
    }
});

export default FormularioUsuarios;