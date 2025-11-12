import React, {useEffect, useState} from "react";
import {View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { ref, set, push, onValue, remove } from "firebase/database";
import { realtimeDB } from "../database/firebaseconfig";

const ProductosRealtime = () => {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [productos, setProductos] = useState([]);

  
    const guardarProducto = () => {
        if (nombre && precio && cantidad) {
            const nuevoProductoRef = push(ref(realtimeDB, 'productos'));
            set(nuevoProductoRef, {
                nombre: nombre,
                precio: precio,
                cantidad: cantidad,
                id: nuevoProductoRef.key
            })
            .then(() => {
                console.log("Producto guardado exitosamente");
                setNombre("");
                setPrecio("");
                setCantidad("");
            })
            .catch((error) => {
                console.error("Error al guardar producto:", error);
            });
        } else {
            alert("Por favor, complete todos los campos");
        }
    };

  
    const cargarProductos = () => {
        const productosRef = ref(realtimeDB, 'productos');
        onValue(productosRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const listaProductos = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setProductos(listaProductos);
            } else {
                setProductos([]);
            }
        });
    };

    
    const eliminarProducto = (id) => {
        const productoRef = ref(realtimeDB, `productos/${id}`);
        remove(productoRef)
            .then(() => {
                console.log("Producto eliminado exitosamente");
            })
            .catch((error) => {
                console.error("Error al eliminar producto:", error);
            });
    };

    
    useEffect(() => {
        cargarProductos();
    }, []);

   
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemNombre}>{item.nombre}</Text>
                <Text style={styles.itemDetalle}>Precio: ${item.precio}</Text>
                <Text style={styles.itemDetalle}>Cantidad: {item.cantidad}</Text>
            </View>
            <TouchableOpacity 
                style={styles.eliminarBtn}
                onPress={() => eliminarProducto(item.id)}
            >
                <Text style={styles.eliminarText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Gestión de Productos - Realtime</Text>
            
           
            <View style={styles.formContainer}>
                <Text style={styles.subtitulo}>Agregar Nuevo Producto</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChangeText={setNombre}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Precio"
                    value={precio}
                    onChangeText={setPrecio}
                    keyboardType="numeric"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Cantidad"
                    value={cantidad}
                    onChangeText={setCantidad}
                    keyboardType="numeric"
                />
                
                <Button
                    title="Guardar Producto"
                    onPress={guardarProducto}
                    color="#2196F3"
                />
            </View>

           
            <View style={styles.listaContainer}>
                <Text style={styles.subtitulo}>Lista de Productos</Text>
                {productos.length === 0 ? (
                    <Text style={styles.sinDatos}>No hay productos registrados</Text>
                ) : (
                    <FlatList
                        data={productos}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={styles.lista}
                    />
                )}
            </View>
        </View>
    );
};

// Estilos de la vista
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#555',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    listaContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    lista: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemInfo: {
        flex: 1,
    },
    itemNombre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemDetalle: {
        fontSize: 14,
        color: '#666',
    },
    eliminarBtn: {
        backgroundColor: '#f44336',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
    },
    eliminarText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    sinDatos: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic',
        marginTop: 20,
    },
});

export default ProductosRealtime;