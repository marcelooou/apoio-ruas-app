// screens/AjudaScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';

export default function AjudaScreen() {
  const abrirSiteGoverno = () => Linking.openURL('https://www.gov.br/mdh');

  return (
    <View style={styles.flexContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Apoio Social a Pessoas em Situação de Rua</Text>
        
        <Text style={styles.subtitulo}>
          Conheça serviços de apoio social que oferecem alimentação, abrigo e outros recursos para quem precisa.
        </Text>

        <Text style={styles.descricao}>
          O Governo Federal oferece diversos recursos para ajudar pessoas em situação de vulnerabilidade social.
        </Text>

        <TouchableOpacity style={styles.botao} onPress={abrirSiteGoverno}>
          <Text style={styles.botaoTexto}>Acessar Site de Apoio do Governo</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Row de 3 imagens no rodapé */}
      <View style={styles.imagesRow}>
        <Image
          source={require('../assets/ajuda1.jpg')}
          style={styles.footerImageWide}
        />
        <Image
          source={require('../assets/ajuda3.jpg')}
          style={styles.footerImageStretch}  // Aqui esticamos a ajuda3
        />
        <Image
          source={require('../assets/ajuda2.jpg')}
          style={styles.footerImageWide}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    paddingBottom: 150, // espaço para as imagens de rodapé
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  descricao: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  botao: {
    backgroundColor: '#2980b9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  botaoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  imagesRow: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerImageWide: {
    width: 200,
    height: undefined,
    aspectRatio: 16 / 9,   // para ajuda1 e ajuda2
    borderRadius: 10,
    resizeMode: 'cover',
  },
  footerImageStretch: {
    width: 200,         // largura fixa para manter o alinhamento
    height: 200,        // altura definida para "esticar" a imagem
    borderRadius: 10,
    resizeMode: 'stretch',  // aqui esticamos a imagem para cobrir a área
  },
});
