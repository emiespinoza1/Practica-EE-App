import React, {useEffect, useState} from "react";
import {View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, ScrollView} from "react-native";
import { ref, set, push, onValue, remove } from "firebase/database";
import { realtimeDB } from "../database/firebaseconfig";

const CalculadoraIMC = () => {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [registros, setRegistros] = useState([]);

    
    const calcularIMC = () => {
        if (!peso || !altura) return 0;
        const alturaMetros = altura / 100;
        return (peso / (alturaMetros * alturaMetros)).toFixed(2);
    };

    const obtenerClasificacion = (imc) => {
        if (imc < 18.5) return "Bajo peso";
        if (imc >= 18.5 && imc < 25) return "Peso normal";
        if (imc >= 25 && imc < 30) return "Sobrepeso";
        return "Obesidad";
    };

    const obtenerColorIMC = (imc) => {
        if (imc < 18.5) return "#3498db"; // Azul  Bajo peso
        if (imc >= 18.5 && imc < 25) return "#27ae60"; // Verde Normal
        if (imc >= 25 && imc < 30) return "#f39c12"; // Naranja  Sobrepeso
        return "#e74c3c"; // Rojo  Obesidad
    };

    
    const guardarIMC = () => {
        if (nombre && edad && peso && altura) {
            const imc = calcularIMC();
            const clasificacion = obtenerClasificacion(parseFloat(imc));
            const fecha = new Date().toLocaleString();

            const nuevoRegistroRef = push(ref(realtimeDB, 'registrosIMC'));
            set(nuevoRegistroRef, {
                nombre: nombre,
                edad: edad,
                peso: peso,
                altura: altura,
                imc: imc,
                clasificacion: clasificacion,
                fecha: fecha,
                id: nuevoRegistroRef.key
            })
            .then(() => {
                console.log("Registro de IMC guardado exitosamente");
               
                setNombre("");
                setEdad("");
                setPeso("");
                setAltura("");
            })
            .catch((error) => {
                console.error("Error al guardar registro:", error);
            });
        } else {
            alert("Por favor, complete todos los campos");
        }
    };

    
    const cargarRegistros = () => {
        const registrosRef = ref(realtimeDB, 'registrosIMC');
        onValue(registrosRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const listaRegistros = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                
                listaRegistros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                setRegistros(listaRegistros);
            } else {
                setRegistros([]);
            }
        });
    };

   
    const eliminarRegistro = (id) => {
        const registroRef = ref(realtimeDB, `registrosIMC/${id}`);
        remove(registroRef)
            .then(() => {
                console.log("Registro eliminado exitosamente");
            })
            .catch((error) => {
                console.error("Error al eliminar registro:", error);
            });
    };

    useEffect(() => {
        cargarRegistros();
    }, []);

    
    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer, { borderLeftColor: obtenerColorIMC(parseFloat(item.imc)) }]}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemNombre}>{item.nombre}</Text>
                <Text style={styles.itemDetalle}>Edad: {item.edad} años</Text>
                <Text style={styles.itemDetalle}>Peso: {item.peso} kg | Altura: {item.altura} cm</Text>
                <View style={styles.imcContainer}>
                    <Text style={styles.itemIMC}>IMC: <Text style={{fontWeight: 'bold'}}>{item.imc}</Text></Text>
                    <Text style={[styles.itemClasificacion, {color: obtenerColorIMC(parseFloat(item.imc))}]}>
                        {item.clasificacion}
                    </Text>
                </View>
                <Text style={styles.itemFecha}>{item.fecha}</Text>
            </View>
            <TouchableOpacity 
                style={styles.eliminarBtn}
                onPress={() => eliminarRegistro(item.id)}
            >
                <Text style={styles.eliminarText}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );

    const imcActual = calcularIMC();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Calculadora de IMC</Text>
            
           
            <ScrollView style={styles.formContainer}>
                <Text style={styles.subtitulo}>Datos Personales</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    value={nombre}
                    onChangeText={setNombre}
                    placeholderTextColor="#999"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Edad"
                    value={edad}
                    onChangeText={setEdad}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Peso (kg)"
                    value={peso}
                    onChangeText={setPeso}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Altura (cm)"
                    value={altura}
                    onChangeText={setAltura}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                />

                {/* Resultado en tiempo real */}
                {peso && altura && (
                    <View style={styles.resultadoContainer}>
                        <Text style={styles.resultadoTitulo}>Resultado:</Text>
                        <Text style={[styles.resultadoIMC, {color: obtenerColorIMC(parseFloat(imcActual))}]}>
                            IMC: {imcActual}
                        </Text>
                        <Text style={[styles.resultadoClasificacion, {color: obtenerColorIMC(parseFloat(imcActual))}]}>
                            {obtenerClasificacion(parseFloat(imcActual))}
                        </Text>
                    </View>
                )}

                <Button
                    title="Guardar Registro de IMC"
                    onPress={guardarIMC}
                    color="#2196F3"
                    disabled={!nombre || !edad || !peso || !altura}
                />
            </ScrollView>

           
            <View style={styles.listaContainer}>
                <Text style={styles.subtitulo}>Historial de Cálculos</Text>
                {registros.length === 0 ? (
                    <Text style={styles.sinDatos}>No hay registros de IMC</Text>
                ) : (
                    <FlatList
                        data={registros}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={styles.lista}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </View>
    );
};

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
        marginBottom: 15,
        color: '#555',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        maxHeight: 400,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
    resultadoContainer: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    resultadoTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    resultadoIMC: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    resultadoClasificacion: {
        fontSize: 16,
        fontWeight: '600',
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
        borderLeftWidth: 4,
        marginBottom: 10,
        backgroundColor: '#fafafa',
        borderRadius: 8,
    },
    itemInfo: {
        flex: 1,
    },
    itemNombre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    itemDetalle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    imcContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    itemIMC: {
        fontSize: 15,
        color: '#333',
    },
    itemClasificacion: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    itemFecha: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
        fontStyle: 'italic',
    },
    eliminarBtn: {
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    eliminarText: {
        fontSize: 18,
    },
    sinDatos: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic',
        marginTop: 20,
        fontSize: 16,
    },
});

export default CalculadoraIMC;