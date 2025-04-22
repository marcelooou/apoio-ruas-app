import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  FlatList,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

export default function PerfilScreen() {
  const [usuario] = useState({
    nome: 'Marcelo',
    email: 'bonfimmarcelo@email.com',
    avatar: require('../assets/desenvolvedor1.jpg'),
    doacoes: 5,
    voluntariado: 3,
  });
  
  const [atividades] = useState([
    { 
      id: '1', 
      tipo: 'doacao', 
      titulo: 'Doação de Roupas', 
      data: '15/06/2023', 
      local: 'Centro de Acolhida Luz',
      status: 'Concluído',
      imagem: require('../assets/ajuda1.jpg'),
    },
    { 
      id: '2', 
      tipo: 'voluntariado', 
      titulo: 'Distribuição de Alimentos', 
      data: '22/05/2023', 
      local: 'Praça da Sé',
      status: 'Concluído',
      imagem: require('../assets/ajuda2.jpg'),
    },
    { 
      id: '3', 
      tipo: 'doacao', 
      titulo: 'Doação de Alimentos', 
      data: '10/04/2023', 
      local: 'Casa de Apoio Esperança',
      status: 'Concluído',
      imagem: require('../assets/ajuda3.jpg'),
    },
  ]);
  
  const [desenvolvedores] = useState([
    {
      id: '1',
      nome: 'Marcelo Bonfim',
      papel: 'Desenvolvedor',
      foto: require('../assets/desenvolvedor1.jpg'),
      github: 'https://github.com/marcelooou',
    },
    {
      id: '2',
      nome: 'Felipe Costa',
      papel: 'Desenvolvedor',
      foto: require('../assets/desenvolvedor2.jpg'),
      github: 'https://github.com/felipeorikasa',
    },
    {
      id: '3',
      nome: 'Antonio',
      papel: 'Desenvolvedor',
      foto: require('../assets/desenvolvedor3.jpg'),
      github: 'https://github.com/ntncaue',
    },
  ]);

  const abrirGithub = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Header title="Meu Perfil" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.userHeader}>
          <Image source={usuario.avatar} style={styles.userAvatar} />
          <Text style={styles.userName}>{usuario.nome}</Text>
          <Text style={styles.userEmail}>{usuario.email}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{usuario.doacoes}</Text>
              <Text style={styles.statLabel}>Doações</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{usuario.voluntariado}</Text>
              <Text style={styles.statLabel}>Voluntariados</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minhas Atividades</Text>
          <FlatList
            data={atividades}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.atividadesList}
            renderItem={({ item }) => (
              <View style={styles.atividadeCard}>
                <Image source={item.imagem} style={styles.atividadeImagem} />
                <View style={styles.atividadeContent}>
                  <View style={styles.atividadeTipo}>
                    <Ionicons 
                      name={item.tipo === 'doacao' ? 'heart' : 'people'} 
                      size={14} 
                      color="#fff" 
                    />
                    <Text style={styles.atividadeTipoText}>
                      {item.tipo === 'doacao' ? 'Doação' : 'Voluntariado'}
                    </Text>
                  </View>
                  <Text style={styles.atividadeTitulo}>{item.titulo}</Text>
                  <Text style={styles.atividadeData}>{item.data}</Text>
                  <Text style={styles.atividadeLocal}>{item.local}</Text>
                </View>
              </View>
            )}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o App</Text>
          <Text style={styles.aboutText}>
            O Apoio Ruas é um aplicativo desenvolvido para facilitar o acesso a recursos e serviços para pessoas em situação de rua, além de conectar voluntários e doadores a iniciativas sociais.
          </Text>
          
          <Text style={styles.devTitle}>Desenvolvedores</Text>
          <View style={styles.desenvolvedores}>
            {desenvolvedores.map((dev) => (
              <TouchableOpacity 
                key={dev.id}
                style={styles.devItem}
                onPress={() => abrirGithub(dev.github)}
              >
                <Image source={dev.foto} style={styles.devFoto} />
                <Text style={styles.devNome}>{dev.nome}</Text>
                <Text style={styles.devPapel}>{dev.papel}</Text>
                <View style={styles.githubButton}>
                  <Ionicons name="logo-github" size={16} color="#fff" />
                  <Text style={styles.githubText}>GitHub</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  userHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2980b9',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#ddd',
    marginHorizontal: 25,
  },
  section: {
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  atividadesList: {
    paddingBottom: 10,
  },
  atividadeCard: {
    width: 240,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  atividadeImagem: {
    width: '100%',
    height: 120,
  },
  atividadeContent: {
    padding: 12,
  },
  atividadeTipo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  atividadeTipoText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 3,
    fontWeight: '500',
  },
  atividadeTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  atividadeData: {
    fontSize: 12,
    color: '#777',
    marginBottom: 2,
  },
  atividadeLocal: {
    fontSize: 12,
    color: '#555',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    marginBottom: 20,
  },
  devTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  desenvolvedores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  devItem: {
    width: '30%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  devFoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  devNome: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  devPapel: {
    fontSize: 11,
    color: '#777',
    textAlign: 'center',
    marginBottom: 8,
  },
  githubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#24292e',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  githubText: {
    color: '#fff',
    fontSize: 11,
    marginLeft: 3,
  },
}); 