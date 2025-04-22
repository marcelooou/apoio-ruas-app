// screens/AjudaScreen.js
import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,Linking,ScrollView,FlatList,TextInput,ActivityIndicator,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import api from '../services/api';

export default function AjudaScreen() {
  const [cidade, setCidade] = useState('São Paulo');
  const [categoria, setCategoria] = useState('assistencia');
  const [locais, setLocais] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const categorias = [
    { id: 'assistencia', nome: 'Assistência Social', icone: 'people' },
    { id: 'abrigos', nome: 'Abrigos', icone: 'home' },
    { id: 'alimentacao', nome: 'Alimentação', icone: 'fast-food' }
  ];

  const buscarLocais = async () => {
    if (!cidade) return;
    
    setCarregando(true);
    setErro(null);
    
    try {
      let resultado = [];
      
      if (categoria === 'assistencia') {
        resultado = await api.buscarLocaisAssistencia(cidade);
      } else if (categoria === 'abrigos') {
        resultado = await api.buscarAbrigos(cidade);
      } else if (categoria === 'alimentacao') {
        resultado = await api.buscarPontosAlimentacao(cidade);
      }
      
    
      setLocais(resultado);
      
    } catch (error) {
      console.error(error);
      setErro('Não foi possível carregar os locais. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  
  useEffect(() => {
    buscarLocais();
  }, [categoria]);

  const abrirMapa = (item) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${item.coordenadas.latitude},${item.coordenadas.longitude}`;
    Linking.openURL(url);
  };

  const getImagemCategoria = (categoria) => {
    if (categoria === 'Assistência Social') return require('../assets/ajuda1.jpg');
    if (categoria === 'Abrigo') return require('../assets/ajuda2.jpg');
    if (categoria === 'Alimentação') return require('../assets/ajuda3.jpg');
    return require('../assets/ajuda4.jpg');
  };

  return (
    <View style={styles.container}>
      <Header title="Buscar Ajuda" />
      
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Digite sua cidade"
            value={cidade}
            onChangeText={setCidade}
            onSubmitEditing={buscarLocais}
          />
          {cidade ? (
            <TouchableOpacity onPress={() => setCidade('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
        
        <TouchableOpacity style={styles.searchButton} onPress={buscarLocais}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.categoriasList}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoriaItem,
              categoria === cat.id && styles.categoriaSelected
            ]}
            onPress={() => setCategoria(cat.id)}
          >
            <Ionicons 
              name={cat.icone} 
              size={22} 
              color={categoria === cat.id ? '#fff' : '#2980b9'} 
            />
            <Text 
              style={[
                styles.categoriaText,
                categoria === cat.id && styles.categoriaTextSelected
              ]}
            >
              {cat.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2980b9" />
          <Text style={styles.loadingText}>Buscando locais...</Text>
        </View>
      ) : erro ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={36} color="#e74c3c" />
          <Text style={styles.errorText}>{erro}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={buscarLocais}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={locais}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="information-circle" size={36} color="#999" />
              <Text style={styles.emptyText}>Nenhum local encontrado. Tente outra cidade ou categoria.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image 
                source={getImagemCategoria(item.categoria)} 
                style={styles.cardImage} 
              />
              <View style={styles.cardContent}>
                <View style={styles.categoriaTag}>
                  <Text style={styles.categoriaTagText}>{item.categoria}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardAddress}>{item.endereco}</Text>
                
                <TouchableOpacity 
                  style={styles.mapButton}
                  onPress={() => abrirMapa(item)}
                >
                  <Ionicons name="map" size={18} color="#fff" />
                  <Text style={styles.mapButtonText}>Ver no Mapa</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#2980b9',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoriasList: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    flex: 1,
    justifyContent: 'center',
  },
  categoriaSelected: {
    backgroundColor: '#2980b9',
  },
  categoriaText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#2980b9',
    fontWeight: '500',
  },
  categoriaTextSelected: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 15,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  categoriaTag: {
    backgroundColor: '#e3f2fd',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoriaTagText: {
    color: '#2980b9',
    fontSize: 12,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  mapButton: {
    backgroundColor: '#27ae60',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
