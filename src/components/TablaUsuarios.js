import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import BotonEliminarUsuario from './BotonEliminarUsuario';

const TablaUsuarios = ({ usuarios, eliminarUsuario, editarUsuario }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Tabla de usuarios</Text>

            <View style={[styles.fila, styles.encabezado]}>
                <Text style={[styles.celda, styles.textoEncabezado]}>Nombre</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Correo</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Telefono</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Edad</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Accion</Text>
            </View>

            {/* Lista de usuarios */}
            <ScrollView>
                {(!usuarios || usuarios.length === 0) ? (
                    <View style={styles.fila}>
                        <Text style={[styles.celda, styles.textoBlanco]}>No hay usuarios</Text>
                    </View>
                ) : (
                    usuarios.map((item) => (
                        <View key={item.id} style={styles.fila}>
                            <Text style={[styles.celda, styles.textoBlanco]}>{item.nombre}</Text>
                            <Text style={[styles.celda, styles.textoBlanco]}>{item.correo}</Text>
                            <Text style={[styles.celda, styles.textoBlanco]}>{item.telefono}</Text>
                            <Text style={[styles.celda, styles.textoBlanco]}>{item.edad}</Text>
                            <View style={styles.celdaAcciones}>
                                <BotonEliminarUsuario id={item.id} eliminarUsuario={eliminarUsuario} />
                                <TouchableOpacity
                                    style={styles.botonActualizar}
                                    onPress={() => editarUsuario(item)}
                                >
                                    <Text>🖊️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:"109%",
        backgroundColor: "#1a1a2e",  
        flex: 1,
        marginLeft:-16,
        alignSelf: "stretch"
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: '#ffffff'  
    },
    fila: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#3d3d5c", 
        paddingVertical: 6,
        alignItems: "center"
    },
    encabezado: {
        backgroundColor: "#2d2d44"  
    },
    celda: {
        flex: 1,
        fontSize: 16,
        textAlign: "center"
    },
    celdaAcciones: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    textoEncabezado: {
        fontWeight: "bold",
        fontSize: 17,
        textAlign: "center",
        color: '#ffffff'  
    },
    botonActualizar: {
        padding: 4,
        borderRadius: 5,
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#4caf50" 
    },
    textoBlanco: {
        color: '#ffffff'  
    }
});

export default TablaUsuarios;