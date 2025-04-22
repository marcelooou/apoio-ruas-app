import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

export default function MapaScreen() {
  const [locais, setLocais] = useState([]);
  const [carregando, setCarregando] = useState(true);

  
  useEffect(() => {
    
    setTimeout(() => {
      setLocais([
        {
          id: '1',
          nome: 'Centro de Acolhida Luz',
          endereco: 'Rua Mauá, 340 - Luz, São Paulo',
          telefone: '(11) 3333-4444',
          imagem: require('../assets/ajuda1.jpg'),
          coordenadas: {
            latitude: -23.5328,
            longitude: -46.6395,
          },
          servicos: ['Alimentação', 'Abrigo noturno', 'Assistência social'],
        },
        {
          id: '2',
          nome: 'Casa de Apoio Esperança',
          endereco: 'Av. do Estado, 1500 - Bom Retiro, São Paulo',
          telefone: '(11) 3444-5555',
          imagem: require('../assets/ajuda2.jpg'),
          coordenadas: {
            latitude: -23.5429,
            longitude: -46.6266,
          },
          servicos: ['Alimentação', 'Banho', 'Roupas', 'Assistência social'],
        },
        {
          id: '3',
          nome: 'Albergue Noturno São Paulo',
          endereco: 'Rua São João, 700 - Centro, São Paulo',
          telefone: '(11) 3555-6666',
          imagem: require('../assets/ajuda3.jpg'),
          coordenadas: {
            latitude: -23.5389,
            longitude: -46.6419,
          },
          servicos: ['Abrigo noturno', 'Banho', 'Assistência social'],
        },
      ]);
      setCarregando(false);
    }, 1500);
  }, []);

  const abrirMapa = (item) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${item.coordenadas.latitude},${item.coordenadas.longitude}`;
    Linking.openURL(url);
  };

  const fazerLigacao = (telefone) => {
    Linking.openURL(`tel:${telefone}`);
  };

  return (
    <View style={styles.container}>
      <Header title="Locais de Apoio" />
      
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/home-background.jpg')} 
          style={styles.mapImage} 
          resizeMode="cover" 
        />
        <Text style={styles.imageText}>Encontre locais de acolhimento e apoio perto de você</Text>
      </View>

      {carregando ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando locais...</Text>
        </View>
      ) : (
        <FlatList
          data={locais}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.imagem} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardAddress}>{item.endereco}</Text>
                
                <View style={styles.servicosContainer}>
                  {item.servicos.map((servico, index) => (
                    <View key={index} style={styles.servicoTag}>
                      <Text style={styles.servicoText}>{servico}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.cardActions}>
                  <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={() => fazerLigacao(item.telefone)}
                  >
                    <Ionicons name="call" size={18} color="#fff" />
                    <Text style={styles.actionText}>Ligar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.mapButton]} 
                    onPress={() => abrirMapa(item)}
                  >
                    <Ionicons name="location" size={18} color="#fff" />
                    <Text style={styles.actionText}>Ver no Mapa</Text>
                  </TouchableOpacity>
                </View>
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
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  imageText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    padding: 15,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
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
    marginBottom: 10,
  },
  servicosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  servicoTag: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
  },
  servicoText: {
    fontSize: 12,
    color: '#2980b9',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#2980b9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
  },
  mapButton: {
    backgroundColor: '#27ae60',
    marginRight: 0,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
}); 