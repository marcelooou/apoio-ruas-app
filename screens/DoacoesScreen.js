import React, { useState } from 'react';
import { View,  Text,  StyleSheet,  TextInput,  TouchableOpacity,  ScrollView,  Image, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

export default function DoacoesScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoDoacao, setTipoDoacao] = useState('');
  const [descricao, setDescricao] = useState('');
  
  const tiposDoacao = [
    { id: 1, nome: 'Alimentos', icone: 'fast-food' },
    { id: 2, nome: 'Roupas', icone: 'shirt' },
    { id: 3, nome: 'Dinheiro', icone: 'cash' },
    { id: 4, nome: 'Voluntariado', icone: 'people' },
    { id: 5, nome: 'Outros', icone: 'cube' },
  ];

  const enviarFormulario = () => {
    
    if (!nome || !email || !tipoDoacao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    
    Alert.alert(
      'Sucesso!', 
      'Agradecemos sua doação! Entraremos em contato em breve.',
      [{ text: 'OK', onPress: limparFormulario }]
    );
  };
  
  const limparFormulario = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setTipoDoacao('');
    setDescricao('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title="Faça uma Doação" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageBanner}>
          <Image 
            source={require('../assets/doacoes.jpg')} 
            style={styles.bannerImage} 
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Sua ajuda pode transformar vidas</Text>
            <Text style={styles.bannerSubtitle}>Contribua com roupas, alimentos ou seu tempo</Text>
          </View>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Preencha seus dados</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome completo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={setNome}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu telefone"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />
          </View>
          
          <Text style={styles.label}>Tipo de doação *</Text>
          <View style={styles.tiposContainer}>
            {tiposDoacao.map((tipo) => (
              <TouchableOpacity
                key={tipo.id}
                style={[
                  styles.tipoItem,
                  tipoDoacao === tipo.nome && styles.tipoSelecionado
                ]}
                onPress={() => setTipoDoacao(tipo.nome)}
              >
                <Ionicons 
                  name={tipo.icone} 
                  size={24} 
                  color={tipoDoacao === tipo.nome ? '#fff' : '#2980b9'} 
                />
                <Text 
                  style={[
                    styles.tipoText,
                    tipoDoacao === tipo.nome && styles.tipoTextSelecionado
                  ]}
                >
                  {tipo.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Detalhes da doação</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva detalhes da sua doação"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/ajuda4.jpg')} 
              style={styles.secondaryImage} 
              resizeMode="cover"
            />
          </View>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={enviarFormulario}
          >
            <Text style={styles.buttonText}>Enviar Doação</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  imageBanner: {
    height: 180,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 15,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 14,
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  tiposContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    marginTop: 10,
  },
  tipoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  tipoSelecionado: {
    backgroundColor: '#2980b9',
  },
  tipoText: {
    marginLeft: 5,
    color: '#2980b9',
    fontWeight: '500',
  },
  tipoTextSelecionado: {
    color: '#fff',
  },
  imageContainer: {
    marginVertical: 20,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  secondaryImage: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 