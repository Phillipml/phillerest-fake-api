import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const restaurantes = [
  {
    id: 1,
    titulo: "Bella Tavola Italiana",
    destacado: true,
    tipo: "italiana",
    avaliacao: 4.7,
    descricao: "A paixão dos nossos talentosos chefs pela cozinha italiana é evidente em cada prato, desde massas caseiras e risotos cremosos até suculentos frutos do mar e carnes tenras.",
    capa: "https://phillerest-fake-api.vercel.app/efood/bella_tavola_italiana/capa.jpeg",
    cardapio: [
      {
        foto: "https://phillerest-fake-api.vercel.app/efood/bella_tavola_italiana/1.webp",
        preco: 69.9,
        id: 1,
        nome: "Ravioli al Tartufo Nero",
        descricao: "O Ravioli al Tartufo Nero é um requintado prato de massa artesanal, que celebra os sabores ricos e terrosos da trufa negra italiana.",
        porcao: "1 a 2 pessoas",
      },
      {
        foto: "https://phillerest-fake-api.vercel.app/efood/bella_tavola_italiana/2.jpg",
        preco: 56.9,
        id: 2,
        nome: "Spaghetti alla Carbonara",
        descricao: "O Spaghetti alla Carbonara é um clássico prato italiano, feito com massa spaghetti al dente, coberto com um molho rico e cremoso.",
        porcao: "1 a 2 pessoas",
      }
    ],
  },
  {
    id: 2,
    titulo: "Casa das Delícias Árabes",
    destacado: false,
    tipo: "árabe",
    avaliacao: 4.8,
    descricao: "A Casa das Delícias Árabes é um acolhedor e autêntico restaurante árabe, localizado no coração da cidade.",
    capa: "https://phillerest-fake-api.vercel.app/efood/casa_delicias_arabes/capa.jpeg",
    cardapio: [
      {
        foto: "https://phillerest-fake-api.vercel.app/efood/casa_delicias_arabes/1.jpg",
        preco: 49.9,
        id: 3,
        nome: "Mezze Platter",
        descricao: "O Mezze Platter é uma seleção de aperitivos tradicionais árabes, incluindo homus, babaganush, tabule, falafel.",
        porcao: "2 a 4 pessoas",
      }
    ],
  },
  {
    id: 3,
    titulo: "Sakura Sushi House",
    destacado: false,
    tipo: "japonês",
    avaliacao: 4.9,
    descricao: "A Sakura Sushi House é um sofisticado e autêntico restaurante japonês que oferece uma experiência culinária imersiva.",
    capa: "https://phillerest-fake-api.vercel.app/efood/sakura_sushi_house/capa.jpeg",
    cardapio: [
      {
        foto: "https://phillerest-fake-api.vercel.app/efood/sakura_sushi_house/1.jpg",
        preco: 89.9,
        id: 4,
        nome: "Sushi e Sashimi Combinado",
        descricao: "O Sushi e Sashimi Combinado é uma seleção de peças cuidadosamente elaboradas por nossos sushimen.",
        porcao: "1 a 2 pessoas",
      }
    ],
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    console.log('Restaurantes API called:', {
      method: req.method,
      url: req.url,
      headers: req.headers,
      timestamp: new Date().toISOString()
    });

    await runMiddleware(req, res, cors)

    // Adicionar headers de CORS explícitos
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    console.log('Returning restaurantes data:', restaurantes.length, 'items');
    res.status(200).json(restaurantes);
  } catch (error) {
    console.error('Error in restaurantes API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
