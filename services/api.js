import axios from 'axios';

// API de dados abertos para serviços sociais
// Usamos a API OpenStreetMap para obter locais de assistência
const api = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  timeout: 10000,
  headers: {
    // Headers necessários para evitar o erro 403
    'User-Agent': 'ApoioRuasApp/1.0',
    'Accept-Language': 'pt-BR,pt;q=0.9',
    'Referer': 'https://apoioruas.com.br'
  }
});

// Função que retorna dados de exemplo quando a API falha
const getDadosExemplo = (tipo, cidade) => {
  const locaisExemplo = {
    'assistencia': [
      {
        id: '1',
        nome: 'Centro de Referência da Assistência Social',
        endereco: `Av. Paulista, 1000 - Bela Vista, ${cidade}`,
        coordenadas: {
          latitude: -23.5632,
          longitude: -46.6541,
        },
        categoria: 'Assistência Social',
      },
      {
        id: '2',
        nome: 'Centro de Apoio Comunitário',
        endereco: `Rua Direita, 250 - Centro, ${cidade}`,
        coordenadas: {
          latitude: -23.5479,
          longitude: -46.6345,
        },
        categoria: 'Assistência Social',
      },
    ],
    'abrigos': [
      {
        id: '3',
        nome: 'Abrigo Municipal',
        endereco: `Rua Augusta, 500 - Consolação, ${cidade}`,
        coordenadas: {
          latitude: -23.5505,
          longitude: -46.6488,
        },
        categoria: 'Abrigo',
      },
      {
        id: '4',
        nome: 'Casa de Acolhida Noturna',
        endereco: `Av. Rio Branco, 150 - Centro, ${cidade}`,
        coordenadas: {
          latitude: -23.5429,
          longitude: -46.6380,
        },
        categoria: 'Abrigo',
      },
    ],
    'alimentacao': [
      {
        id: '5',
        nome: 'Restaurante Popular Bom Prato',
        endereco: `Rua 25 de Março, 200 - Centro, ${cidade}`,
        coordenadas: {
          latitude: -23.5430,
          longitude: -46.6334,
        },
        categoria: 'Alimentação',
      },
      {
        id: '6',
        nome: 'Refeitório Solidário São José',
        endereco: `Av. Rangel Pestana, 300 - Brás, ${cidade}`,
        coordenadas: {
          latitude: -23.5450,
          longitude: -46.6260,
        },
        categoria: 'Alimentação',
      },
    ]
  };
  
  return locaisExemplo[tipo] || [];
};

export const buscarLocaisAssistencia = async (cidade) => {
  try {
    const response = await api.get('/search', {
      params: {
        q: `assistência social ${cidade}`,
        format: 'json',
        addressdetails: 1,
        limit: 10,
      }
    });
    
    if (response.data && response.data.length > 0) {
      return response.data.map(local => ({
        id: local.place_id,
        nome: local.display_name.split(',')[0],
        endereco: local.display_name,
        coordenadas: {
          latitude: parseFloat(local.lat),
          longitude: parseFloat(local.lon),
        },
        categoria: 'Assistência Social',
      }));
    } else {
      console.log('Nenhum resultado encontrado na API, usando dados de exemplo');
      return getDadosExemplo('assistencia', cidade);
    }
  } catch (error) {
    console.error('Erro ao buscar locais de assistência:', error);
    return getDadosExemplo('assistencia', cidade);
  }
};

export const buscarAbrigos = async (cidade) => {
  try {
    const response = await api.get('/search', {
      params: {
        q: `abrigo pessoas rua ${cidade}`,
        format: 'json',
        addressdetails: 1,
        limit: 10,
      }
    });
    
    if (response.data && response.data.length > 0) {
      return response.data.map(local => ({
        id: local.place_id,
        nome: local.display_name.split(',')[0],
        endereco: local.display_name,
        coordenadas: {
          latitude: parseFloat(local.lat),
          longitude: parseFloat(local.lon),
        },
        categoria: 'Abrigo',
      }));
    } else {
      console.log('Nenhum resultado encontrado na API, usando dados de exemplo');
      return getDadosExemplo('abrigos', cidade);
    }
  } catch (error) {
    console.error('Erro ao buscar abrigos:', error);
    return getDadosExemplo('abrigos', cidade);
  }
};

export const buscarPontosAlimentacao = async (cidade) => {
  try {
    const response = await api.get('/search', {
      params: {
        q: `restaurante popular ${cidade}`,
        format: 'json',
        addressdetails: 1,
        limit: 10,
      }
    });
    
    if (response.data && response.data.length > 0) {
      return response.data.map(local => ({
        id: local.place_id,
        nome: local.display_name.split(',')[0],
        endereco: local.display_name,
        coordenadas: {
          latitude: parseFloat(local.lat),
          longitude: parseFloat(local.lon),
        },
        categoria: 'Alimentação',
      }));
    } else {
      console.log('Nenhum resultado encontrado na API, usando dados de exemplo');
      return getDadosExemplo('alimentacao', cidade);
    }
  } catch (error) {
    console.error('Erro ao buscar pontos de alimentação:', error);
    return getDadosExemplo('alimentacao', cidade);
  }
};

export default {
  buscarLocaisAssistencia,
  buscarAbrigos,
  buscarPontosAlimentacao,
};
