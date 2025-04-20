import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/home-background.jpg')}  // Imagem de fundo
      style={styles.container}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"  // Garantir que a imagem cubra toda a tela sem distorção
    >
      {/* Título principal */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Apoio a Pessoas em Situação de Rua</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Encontre apoio, abrigo e alimentação onde você mais precisa.
          </Text>
        </View>
      </View>

      {/* Imagem adicional (ajuda4.jpg) */}
      <Image
        source={require('../assets/ajuda4.jpg')}  // Imagem extra
        style={styles.helpImage}
      />

      {/* Botão de navegação */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ajuda')}>
        <Text style={styles.buttonText}>Saiba Mais</Text>
      </TouchableOpacity>

      {/* Texto adicional ou informações */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          O Governo Federal e outras organizações oferecem diversos recursos de apoio social.
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backgroundImage: {
    opacity: 0.6,  // Ajuste de opacidade para suavizar o fundo
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',  // Texto branco para contraste com o fundo
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fundo semi-transparente para melhorar a legibilidade
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',  // Texto branco para contraste com o fundo
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  helpImage: {
    width: '80%',  // Ajuste de tamanho da imagem
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  button: {
    backgroundColor: '#2980b9',  // Cor de destaque para o botão
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
