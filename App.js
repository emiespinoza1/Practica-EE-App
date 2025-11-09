import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home';
import Clientes from './src/views/Clientes';
import Productos from './src/views/Productos';
import Promedios from './src/views/Promedios';
import Usuarios from './src/views/Usuarios';
import Login from './src/components/Login';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './src/database/firebaseconfig';

const Stack = createNativeStackNavigator();


const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0f0f23',
    card: '#1a1a2e',
    text: '#ffffff',
    border: '#2d2d44',
    primary: '#6366f1',
  },
};


const screenOptions = {
  headerStyle: {
    backgroundColor: '#1a1a2e',
  },
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerShadowVisible: false,
  contentStyle: {
    backgroundColor: '#0f0f23',
  },
};

export default function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator 
        initialRouteName={usuario ? "Home" : "Login"}
        screenOptions={screenOptions}
      >
        {!usuario ? (
          <Stack.Screen 
            name="Login" 
            options={{ headerShown: false }}
          >
            {(props) => (
              <Login {...props} onLoginSuccess={() => setUsuario(auth.currentUser)} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen 
              name="Home" 
              options={{ 
                title: '🏠 Inicio',
                headerShown: false 
              }}
            >
              {(props) => (
                <Home {...props} cerrarSesion={() => cerrarSesion(props.navigation)} />
              )}
            </Stack.Screen>
            <Stack.Screen 
              name="Clientes" 
              options={{ 
                title: '👥 Clientes',
                headerBackTitle: 'Atrás'
              }}
            >
              {(props) => (
                <Clientes {...props} cerrarSesion={() => cerrarSesion(props.navigation)} />
              )}
            </Stack.Screen>
            <Stack.Screen 
              name="Productos" 
              options={{ 
                title: '📦 Productos',
                headerBackTitle: 'Atrás'
              }}
            >
              {(props) => (
                <Productos {...props} cerrarSesion={() => cerrarSesion(props.navigation)} />
              )}
            </Stack.Screen>
            <Stack.Screen 
              name="Promedios" 
              options={{ 
                title: '📊 Promedios',
                headerBackTitle: 'Atrás'
              }}
            >
              {(props) => (
                <Promedios {...props} cerrarSesion={() => cerrarSesion(props.navigation)} />
              )}
            </Stack.Screen>
            <Stack.Screen 
              name="Usuarios" 
              options={{ 
                title: '👤 Usuarios',
                headerBackTitle: 'Atrás'
              }}
            >
              {(props) => (
                <Usuarios {...props} cerrarSesion={() => cerrarSesion(props.navigation)} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}