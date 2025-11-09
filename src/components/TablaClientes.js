import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BotonEliminacionClientes from "./BotonEliminacionClientes";

const TablaClientes = ({ clientes, eliminarCliente }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tabla de Clientes</Text>

      <View style={[styles.fila, styles.encabezado]}>
        <Text style={[styles.celda, styles.textoEncabezado]}>Nombre</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Apellido</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Edad</Text>
        <Text style={[styles.celdaAcciones, styles.textoEncabezado]}>Acciones</Text>
      </View>

      <ScrollView> 
        { clientes === null ? <Text style={styles.textoBlanco}>No hay clientes registrados.</Text> : clientes.map((item) => (
          <View key={item.id} style={styles.fila}>
            <Text style={[styles.celda, styles.textoBlanco]}>{item.nombre}</Text>
            <Text style={[styles.celda, styles.textoBlanco]}>{item.apellido}</Text>
            <Text style={[styles.celda, styles.textoBlanco]}>{item.edad}</Text>

            <View style={[styles.celdaAcciones]}>
              <BotonEliminacionClientes id={item.id} eliminarCliente={eliminarCliente}/>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: "stretch",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: '#ffffff'  
  },
  fila: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#3d3d5c", 
    paddingVertical: 6,
    alignItems: "center",
  },
  encabezado: {
    backgroundColor: "#2d2d44",  
  },
  celda: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
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
  textoBlanco: {
    color: '#ffffff'  
  },
});

export default TablaClientes;