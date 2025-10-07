// Utilitário para detectar a URL base e configurar endpoints
export const getBaseUrl = () => {
  // Em produção no Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Em produção com domínio customizado
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  
  // Em desenvolvimento local
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // Fallback para produção
  return 'https://phillerest-fake-api.vercel.app';
};

export const getApiUrl = (endpoint: string) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/api/${endpoint}`;
};

// Endpoints disponíveis
export const API_ENDPOINTS = {
  // EFood
  RESTAURANTES: 'efood/restaurantes',
  RESTAURANTE_BY_ID: (id: string) => `efood/restaurantes/${id}`,
  EFood_CHECKOUT: 'efood/checkout',
  
  // Vagas
  VAGAS: 'vagas',
  VAGA_BY_ID: (id: string) => `vagas/${id}`,
  
  // EBAC Sports
  EBAC_SPORTS: 'ebac_sports',
  
  // EPlay
  EPLAY_ACAO: 'eplay/acao',
  EPLAY_DESTAQUE: 'eplay/destaque',
  EPLAY_EM_BREVE: 'eplay/em-breve',
  EPLAY_ESPORTES: 'eplay/esportes',
  EPLAY_JOGO_BY_ID: (id: string) => `eplay/jogos/${id}`,
  EPLAY_LUTA: 'eplay/luta',
  EPLAY_PROMOCOES: 'eplay/promocoes',
  EPLAY_RPG: 'eplay/rpg',
  EPLAY_SIMULACAO: 'eplay/simulacao',
  EPLAY_CHECKOUT: 'eplay/checkout',
  
  // Outros
  CANDIDATURAS: 'candidaturas',
  CONTATOS: 'contatos',
} as const;
