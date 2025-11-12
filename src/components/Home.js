import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  StatusBar 
} from 'react-native';

export default function Home({ navigation, cerrarSesion }) {
  const menuItems = [
    {
      id: 1,
      title: '👥 Clientes',
      description: 'Gestionar lista de clientes',
      route: 'Clientes',
      color: '#10b981',
      icon: ''
    },
    {
      id: 2,
      title: '📦 Productos',
      description: 'Administrar inventario',
      route: 'Productos',
      color: '#3b82f6',
      icon: ''
    },

    
    {
      id: 3,
      title: '📊 Promedios',
      description: 'Calcular promedios',
      route: 'Promedios',
      color: '#8b5cf6',
      icon: ''
    },
    {
      id: 4,
      title: '👤 Usuarios',
      description: 'Gestionar usuarios',
      route: 'Usuarios',
      color: '#f59e0b',
      icon: ''
    },

    {
  id: 5,
  title: '🔄 Productos RealTime',
  description: 'Base de datos en tiempo real',
  route: 'ProductosRealtime',
  color: '#ec4899',
  icon: ''
}
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}> 🥵 EE App</Text>
        <Text style={styles.headerSubtitle}>Panel de administración</Text>
      </View>

      {/* Menu  */}
      <ScrollView style={styles.menuContainer}>
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuCard, { borderLeftColor: item.color }]}
              onPress={() => navigation.navigate(item.route)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
              <View style={[styles.menuArrow, { backgroundColor: item.color }]}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* cerrar sesión */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Irse de esta fyneshit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    backgroundColor: '#0f0f23',
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#1b1b21ff',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'italic',
    color: '#ffffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff8f8ff',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    backgroundColor: '#23235eff',
    borderRadius: 20,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#2d334bff',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  menuIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
  },
  menuArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  arrowText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: '#110b2fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#690606ff',
    borderRadius: 12,
    paddingVertical: 15,
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  logoutText: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: 'italic',
  },
});