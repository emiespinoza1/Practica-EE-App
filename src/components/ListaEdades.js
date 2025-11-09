import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const ListaEdades = ({ edades }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Edades</Text>
      <FlatList
        data={edades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>
              {item.nombre} - {item.edad}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center",
    backgroundColor: '#070323ff'  
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 5,
    color: '#ffffff', 
    backgroundColor: '#070323ff' ,
    borderRadius: 10,  
  },
  itemContainer: {
    backgroundColor: '#070323ff'  
  },
  item: { 
    padding: 5, 
    marginBottom: 5,
    color: '#ffffff',  
    backgroundColor: '#070323ff',
    borderRadius: 8  
  },
});

export default ListaEdades;