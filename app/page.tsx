'use client';
import { useState, useEffect } from 'react';

const TailwindScript = () => (
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
);

const PRODUTOS = [
  { id: 'tradicional', nome: 'Mini Cookies Tradicionais', desc: '12 unidades - Escolha o recheio', preco: 10.90, duplo: 19.00, foto: '/cookie-tradicional.png', categoria: 'Mini Cookies' },
  { id: 'bites', nome: 'Cookie Bites', desc: '12 unidades - Escolha o recheio', preco: 11.90, duplo: 20.00, foto: '/cookie-bites.png', categoria: 'Mini Cookies' },
  { id: 'tradicional-grande', nome: 'Cookie Tradicional', desc: 'Com gotas de chocolate', preco: 18.90, duplo: 36.00, foto: '/cookie-padrao.png', categoria: 'Cookies Tamanho Padrão' },
  { id: 'nutella', nome: 'Cookie Nutella', desc: 'Recheado com Nutella', preco: 18.90, duplo: 36.00, foto: '/cookie-nutella.png', categoria: 'Cookies Tamanho Padrão' },
  { id: 'pastel-nutella', nome: 'Pastel de Ninho com Nutella', desc: 'Recheio de Nutella', preco: 8.50, foto: '/pastel-nutella.png', categoria: 'Pastéis de Ninho' },
  { id: 'pastel-doceleite', nome: 'Pastel de Ninho com Doce de Leite', desc: 'Recheio de Doce de Leite Cremoso Autoral', preco: 8.50, foto: '/pastel-doceleite.png', categoria: 'Pastéis de Ninho' },
  { id: 'pastel-goiabada', nome: 'Pastel de Ninho com Goiabada', desc: 'Recheio Cremoso de Goiabada', preco: 8.50, foto: '/pastel-goiabada.png', categoria: 'Pastéis de Ninho' },
  { id: 'pastel-brigadeiro', nome: 'Pastel de Ninho com Brigadeiro', desc: 'Recheio Cremoso de Brigadeiro Autoral', preco: 8.50, foto: '/pastel-brigadeiro.png', categoria: 'Pastéis de Ninho' },
  { id: 'coca-cola', nome: 'Coca-Cola - 200ml', desc: 'PET 200ml', preco: 3.50, foto: '/coca200.png', categoria: 'Bebidas' },
  { id: 'agua-copo', nome: 'Água Mineral - Copo 200ml', desc: 'Copo de Água de 200ml', preco: 2.50, foto: '/agua200.png', categoria: 'Bebidas' },
];
const CATEGORIAS = ['Mini Cookies', 'Cookies Tamanho Padrão', 'Pastéis de Ninho', 'Bebidas'];

// --- CONFIGURAÇÃO DE FUNCIONAMENTO DA LOJA ---
const CONFIGURACAO_LOJA = {
  horarioAbertura: 9, 
  horarioFechamento: 18, 
  feriados: ['2026-12-25', '2027-01-01', '2028-01-01'], 
};

const verificarStatusLoja = () => {
  const agora = new Date();
  const horaBrasilia = agora.getHours(); 
  const diaHoje = agora.toISOString().split('T')[0];

  const estaEmFeriado = CONFIGURACAO_LOJA.feriados.includes(diaHoje);
  const foraDoHorario = horaBrasilia < CONFIGURACAO_LOJA.horarioAbertura || horaBrasilia >= CONFIGURACAO_LOJA.horarioFechamento;

  return {
    fechadoPorHorario: estaEmFeriado || foraDoHorario,
    mensagem: estaEmFeriado ? "Estamos em recesso!" : "No momento estamos fechados."
  };
};

// VOCÊ PODE ALTERAR OU ADICIONAR MAIS SABORES AQUI:
const SABORES_RECHEIO = ['Nutella', 'Doce de Leite', 'Ninho', 'Chocolate Meio Amargo'];

const ModalFechado = ({ mensagem }) => (
  <div 
    style={{ 
      position: 'fixed', 
      top: 0, left: 0, right: 0, bottom: 0, 
      zIndex: 9999, 
      backgroundColor: 'rgba(0, 0, 0, 0.75)', 
      backdropFilter: 'blur(4px)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '1rem' 
    }}
  >
    <div className="w-full max-w-sm bg-[#f6f4f0] rounded-[2rem] p-8 flex flex-col items-center text-center shadow-2xl">
      
      {/* Ícone Redondo Marrom */}
      <div className="bg-[#5c4033] text-white w-14 h-14 rounded-full flex items-center justify-center mb-5 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      </div>

      <p className="text-[#5c4033] text-[10px] font-bold tracking-widest uppercase mb-2">
        Sávea Doceria
      </p>
      
      <h2 className="text-[#3b2b20] text-lg font-bold mb-3 leading-snug">
        {mensagem}
      </h2>
      
      <p className="text-[#7d6b5d] text-xs font-medium mb-8 px-2">
        Fiquem ligados em nossas redes sociais! <br /> Agradecemos a preferência!!
      </p>

      {/* Botões Redes Sociais */}
      <div className="flex justify-center gap-4">
        <a href="https://instagram.com/seuusuario" className="bg-white p-3.5 rounded-full shadow-sm text-[#5c4033] hover:scale-105 transition-transform">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
        </a>
        <a href="https://wa.me/5514988396568" className="bg-white p-3.5 rounded-full shadow-sm text-[#5c4033] hover:scale-105 transition-transform">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </div>
  </div>
);

export default function CardapioDigital() {
  const [lojaFechada, setLojaFechada] = useState(false);

  useEffect(() => {
    const status = verificarStatusLoja();
    setLojaFechada(status.fechadoPorHorario);
  }, []);
  const [passo, setPasso] = useState(1);
  const [quantidades, setQuantidades] = useState<Record<string, number>>({
    tradicional: 0, bites: 0, 'tradicional-grande': 0, nutella: 0, 
    'pastel-nutella': 0, 'pastel-doce-leite': 0, 'pastel-goiabada': 0, 
    'pastel-brigadeiro': 0, 'coca-cola': 0
  });
  
  // Guarda os sabores escolhidos para cada unidade de mini cookie adicionada
  const [saboresEscolhidos, setSaboresEscolhidos] = useState<{produtoId: string, itemIndex: number, sabor: string}[]>([]);
  
  // Controle da janela (modal) de escolha de sabor
  const [modalSabor, setModalSabor] = useState<{ aberto: boolean, produtoId: string | null, itemIndex: number }>({
    aberto: false,
    produtoId: null,
    itemIndex: 0
  });
  const [modalValeAberto, setModalValeAberto] = useState(false);
const [bandeiraVale, setBandeiraVale] = useState('');

  // Pega a data e hora atual do sistema do cliente (Fuso de Brasília/Local)
  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString('en-CA'); // Gera 'AAAA-MM-DD' sempre na data local correta
  const horarioFormatado = dataAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Gera 'HH:MM'

  const [dadosCliente, setDadosCliente] = useState({
    nome: '',
    whatsapp: '',
    tipoEntrega: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    complemento: '',
    agendamento: 'imediato', // 'imediato' ou 'agendado'
    data: '',
    horario: '',
    pin: '',
    obsEntregador: '',
    tipoImovel: '',
    observacoes: ''
  });
  
  const [experiencia, setExperiencia] = useState('');
  const [avisoRetirada, setAvisoRetirada] = useState(false);

  const [formaPagamento, setFormaPagamento] = useState(''); // 'pix', 'cartao_entrega', 'dinheiro'
  const [trocoPara, setTrocoPara] = useState(''); // guarda o valor do troco se for dinheiro

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('clienteSalvo');
    if (dadosSalvos) {
      setDadosCliente(JSON.parse(dadosSalvos));
    }
  }, []);

  const buscarCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setDadosCliente(prev => ({
            ...prev,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const alterarQtd = (id: string, operacao: 'mais' | 'menos') => {
    const produto = PRODUTOS.find(p => p.id === id);
    const qtdAtual = quantidades[id] || 0;

    if (operacao === 'mais') {
      // Se for Mini Cookie, abre a janela antes de aumentar a quantidade
      if (produto?.categoria === 'Mini Cookies') {
        setModalSabor({
          aberto: true,
          produtoId: id,
          itemIndex: qtdAtual + 1
        });
      } else {
        // Se for tamanho normal, adiciona direto
        setQuantidades(prev => ({ ...prev, [id]: qtdAtual + 1 }));
      }
    } else {
      // Operação de MENOS
      if (qtdAtual > 0) {
        setQuantidades(prev => ({ ...prev, [id]: qtdAtual - 1 }));
        // Remove a última escolha de sabor feita para esse produto
        if (produto?.categoria === 'Mini Cookies') {
          setSaboresEscolhidos(prev => {
            const filtrados = prev.filter(item => item.produtoId === id);
            filtrados.pop(); // tira o último
            const outrosProdutos = prev.filter(item => item.produtoId !== id);
            return [...outrosProdutos, ...filtrados];
          });
        }
      }
    }
  };

  // Função chamada quando o cliente clica no sabor desejado dentro do Modal
  const selecionarSabor = (sabor: string) => {
    if (modalSabor.produtoId) {
      const pId = modalSabor.produtoId;
      
      // Salva o sabor selecionado
      setSaboresEscolhidos(prev => [...prev, { produtoId: pId, itemIndex: modalSabor.itemIndex, sabor }]);
      
      // Aumenta a quantidade do produto de fato
      setQuantidades(prev => ({ ...prev, [pId]: (prev[pId] || 0) + 1 }));
    }
    
    // Fecha a janela
    setModalSabor({ aberto: false, produtoId: null, itemIndex: 0 });
  };

  const calcularTotal = () => {
    let totalItens = 0;
    let valorTotal = 0;
    
    PRODUTOS.forEach(p => {
      const qtd = quantidades[p.id] || 0;
      if (qtd > 0) {
        totalItens += qtd;
        // Aplica a regra de desconto apenas se for Mini Cookie (que tem a propriedade 'duplo')
        if (p.categoria === 'Mini Cookies' && p.duplo) {
          const pares = Math.floor(qtd / 2);
          const sobras = qtd % 2;
          valorTotal += (pares * p.duplo) + (sobras * p.preco);
        } else {
          // Para Pastéis e Bebidas, usa apenas o preço unitário
          valorTotal += (qtd * p.preco);
        }
      }
    });

    // ADICIONE ESTA LINHA: soma 10 reais se for entrega e houver produtos no carrinho
    if (dadosCliente.tipoEntrega === 'Entrega' && totalItens > 0) {
      valorTotal += 10.00;
    }

    return { totalItens, valorTotal };
  };

  const { totalItens, valorTotal } = calcularTotal();
  const formatarMoeda = (valor: number | undefined) => {
    return (valor || 0).toFixed(2).replace('.', ',');
  };

  const finalizarPedido = () => {
    let itemsTexto = '';
    PRODUTOS.forEach(p => {
      const qtd = quantidades[p.id];
      if (qtd > 0) {
        if (p.categoria === 'Mini Cookies') {
          // Agrupa os sabores para esse produto para enviar bonitinho no WhatsApp
          const saboresDeste = saboresEscolhidos.filter(s => s.produtoId === p.id).map(s => s.sabor);
          
          // Conta quantos de cada sabor foram pedidos
          const contagemSabores: Record<string, number> = {};
          saboresDeste.forEach(s => { contagemSabores[s] = (contagemSabores[s] || 0) + 1; });
          
          itemsTexto += `- ${qtd}x ${p.nome}:\n`;
          Object.entries(contagemSabores).forEach(([sab, q]) => {
            itemsTexto += `   • ${q}x Recheio de ${sab}\n`;
          });
        } else {
          itemsTexto += `- ${qtd}x ${p.nome}\n`;
        }
      }
    });

    const agendamentoTexto = dadosCliente.agendamento === 'agendamento' || dadosCliente.agendamento === 'agendado'
    ? `*Agendado para:* ${dadosCliente.data} às ${dadosCliente.horario}`
    : `*Entrega:* Imediata`;

    let enderecoTexto = '*Retirada no Local*';
  if (dadosCliente.tipoEntrega === 'Entrega') {
    enderecoTexto = `*Endereço:* ${dadosCliente.rua}, Nº ${dadosCliente.numero}\n` +
      `*Bairro:* ${dadosCliente.bairro} - ${dadosCliente.cidade || 'Bauru'}\n` +
      `*CEP:* ${dadosCliente.cep}\n` + 
      (dadosCliente.complemento ? `*Complemento:* ${dadosCliente.complemento}\n` : '') +
      `*Tipo de Imóvel:* ${dadosCliente.tipoImovel || 'Não informado'}\n` +
      (dadosCliente.obsEntregador ? `*Observações Entregador:* ${dadosCliente.obsEntregador}\n` : '');
  }

  let pagamentoTexto = '';
  if (formaPagamento === 'pix') {
    pagamentoTexto = '*Forma de Pagamento:* Pix';
  } else if (formaPagamento === 'cartao_entrega') {
    pagamentoTexto = '*Forma de Pagamento:* Cartão na Entrega (Levar Maquininha)';
  } else if (formaPagamento === 'Vale Refeição/Alimentação') {
    pagamentoTexto = `*Forma de Pagamento:* Vale Refeição/Alimentação (${bandeiraVale || 'Não especificada'})`;
  } else if (formaPagamento === 'dinheiro') {
    if (trocoPara) {
      pagamentoTexto = `*Forma de Pagamento:* Dinheiro (Troco para R$ ${trocoPara})`;
    } else {
      pagamentoTexto = '*Forma de Pagamento:* Dinheiro (Não precisa de troco)';
    }
  }

  const textoFormatado = `*Novo Pedido - Doceria Sávea*\n\n` +
    `*Cliente:* ${dadosCliente.nome}\n` +
    `*WhatsApp:* ${dadosCliente.whatsapp}\n\n` +
    `${enderecoTexto}\n` +
    `${agendamentoTexto}\n` +
    `*PIN de Segurança:* ${dadosCliente.pin || 'Não definido'}\n\n` +
    `*Itens do Pedido:*\n${itemsTexto}\n` +
    (dadosCliente.tipoEntrega === 'Entrega' ? `*Taxa de Entrega:* R$ 10,00\n` : '') +
    `*Total:* R$ ${formatarMoeda(valorTotal)}\n` +
    `${pagamentoTexto}`;
      
    const numeroWhats = "5514988396568"; 
    window.open(`https://wa.me/${numeroWhats}?text=${encodeURIComponent(textoFormatado)}`, '_blank');
  };

  return (
<>
      {lojaFechada && <ModalFechado mensagem="No momento estamos fechados. Fique ligado em nossas redes sociais!" />}
    <div className="relative min-h-screen flex items-start justify-center px-4 py-6" style={{ backgroundColor: '#f3eae1', fontFamily: 'sans-serif' }}>
      <TailwindScript />
      <div className="w-full max-w-xl mx-auto space-y-4">
        
        {/* LOGO E TOPO */}
        <div className="text-center pt-4 pb-2">
          <div className="flex justify-center mb-2">
            <img src="/logo-savea.png" alt="Sávea Doceria" className="h-20 object-contain" />
          </div>
          <p className="text-xs italic tracking-wide" style={{ color: '#606246' }}>Doces de verdade, feitos com cuidado. ♡</p>
        </div>

        {/* CARD BRANCO PRINCIPAL */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-gray-800">
          
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight" style={{ color: '#444631' }}>Faça seu pedido</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Escolha seus doces favoritos e receba em casa.</p>
          </div>

          {/* PASSOS PROGRESSO */}
          <div className="flex items-center justify-center space-x-2 mb-8 text-xs font-semibold">
            <div className="text-center">
              <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-white ${passo >= 1 ? '' : 'bg-gray-200'}`} style={{ backgroundColor: passo >= 1 ? '#5f6443' : '' }}>1</div>
              <span className="block mt-1 text-[10px]" style={{ color: passo === 1 ? '#444631' : '#9ca3af' }}>Produtos</span>
            </div>
            <div className="w-10 h-0.5 bg-gray-200 -mt-4" />
            <div className="text-center">
              <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-white ${passo >= 2 ? '' : 'bg-gray-200'}`} style={{ backgroundColor: passo >= 2 ? '#5f6443' : '' }}>2</div>
              <span className="block mt-1 text-[10px]" style={{ color: passo === 2 ? '#444631' : '#9ca3af' }}>Dados</span>
            </div>
            <div className="w-10 h-0.5 bg-gray-200 -mt-4" />
            <div className="text-center">
              <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-white ${passo >= 3 ? '' : 'bg-gray-200'}`} style={{ backgroundColor: passo >= 3 ? '#5f6443' : '' }}>3</div>
              <span className="block mt-1 text-[10px]" style={{ color: passo === 3 ? '#444631' : '#9ca3af' }}>Entrega</span>
            </div>
            <div className="w-10 h-0.5 bg-gray-200 -mt-4" />
              <div className="text-center">
                <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-white ${passo >= 4 ? '' : 'bg-gray-200'}`} style={{ backgroundColor: passo >= 4 ? '#5f6443' : '' }}>4</div>
                <span className="block mt-1 text-[10px]" style={{ color: passo === 4 ? '#444631' : '#9ca3af' }}>Pagamento</span>
              </div>
          </div>

          {/* BANNER AVISO: PRODUÇÃO ARTESANAL */}
          {passo === 1 && (
            <div className="flex items-center justify-center text-center space-x-3 mb-5 p-4 rounded-xl" style={{ backgroundColor: '#fbf7f0', border: '1px solid #ebdcc5' }}>
              
              <div>
                <p className="font-bold text-gray-800">Produção artesanal</p>
                <p className="text-gray-500">Nossos produtos são preparados frescos para garantir o máximo de qualidade e sabor.</p>
              </div>
            </div>
          )}

          {/* PASSO 1: LISTA DOS COOKIES DIVIDIDA POR SEÇÕES ESTILO IFOOD */}
          {passo === 1 && (
            <div className="space-y-6">
              {CATEGORIAS.map(categoria => {
                const produtosDaCategoria = PRODUTOS.filter(p => p.categoria === categoria);
                if (produtosDaCategoria.length === 0) return null;

                return (
                  <div key={categoria} className="space-y-3">
                    <h2 className="text-base font-bold tracking-tight pt-2 border-b border-gray-100 pb-1" style={{ color: '#444631' }}>
                      {categoria}
                    </h2>

                    <div className="space-y-3">
                      {produtosDaCategoria.map(p => {
                        // Filtra os sabores escolhidos especificamente para este item para exibir logo abaixo do nome
                        const saboresDesteCookie = saboresEscolhidos.filter(s => s.produtoId === p.id);

                        return (
                          <div key={p.id} className="rounded-xl border border-gray-100 p-3 bg-white flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-3">
                              <img src={p.foto} alt={p.nome} className="w-16 h-16 rounded-full object-cover bg-gray-50 border border-gray-100 flex-shrink-0" />
                              <div>
                                <h3 className="font-bold text-sm text-gray-900">{p.nome}</h3>
                                <p className="text-[11px] text-gray-400">{p.desc}</p>
                                
                                {/* EXIBE OS SABORES QUE O CLIENTE ESCOLHEU DEBAIXO DO MINI COOKIE */}
                                {saboresDesteCookie.length > 0 && (
                                  <div className="mt-1 text-[10px] text-gray-500 italic bg-gray-50 p-1 px-2 rounded border border-gray-100">
                                    Sabores: {saboresDesteCookie.map(s => s.sabor).join(', ')}
                                  </div>
                                )}

                                <div className="mt-1 flex items-center space-x-2 flex-wrap">
                                <span className="text-sm font-bold" style={{ color: '#5f6443' }}>R$ {formatarMoeda(p.preco)}</span>
                                {p.duplo && (
  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full md:rounded-full inline-block mt-1 md:mt-0" style={{ backgroundColor: '#f6f5ea', color: '#5f6443', border: '1px solid #e2dfcc' }}>
  2 por R$ {formatarMoeda(p.duplo)}
  </span>
)}
                                </div>
                              </div>
                            </div>
                            
                            {/* BOTÕES VERDE OLIVA */}
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <button 
                                onClick={() => alterarQtd(p.id, 'menos')}
                                className="h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                style={{ backgroundColor: '#5f6443' }}
                              >-</button>
                              <span className="w-5 text-center font-bold text-sm text-gray-800">{quantidades[p.id] || 0}</span>
                              <button 
                                onClick={() => alterarQtd(p.id, 'mais')}
                                className="h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                style={{ backgroundColor: '#5f6443' }}
                              >+</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* TABELA DE SUBTOTAL TOTAL */}
              <div className="sticky bottom-0 bg-white pt-3 pb-2 -mx-6 px-6 border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-40 sm:relative sm:bottom-auto sm:p-0 sm:bg-transparent sm:shadow-none sm:border-0">
                
                <div className="rounded-xl p-4 text-xs space-y-2" style={{ backgroundColor: '#fbf7f0' }}>
                  <div className="flex justify-between text-gray-500">
                    <span>Itens</span>
                    <span>{totalItens} itens</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>R$ {formatarMoeda(valorTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Entrega</span>
                    <span>A calcular</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-gray-300 pt-2 font-bold text-sm text-gray-900">
                    <span>TOTAL</span>
                    <span className="text-lg" style={{ color: '#444631' }}>R$ {formatarMoeda(valorTotal)}</span>
                  </div>
                </div>

                {/* BOTÃO PRINCIPAL VERDE MILITAR */}
                <button 
                  disabled={totalItens === 0}
                  onClick={() => setPasso(2)}
                  className="w-full text-white font-medium py-3 rounded-xl mt-3 transition-colors disabled:opacity-50 flex items-center justify-center space-x-1"
                  style={{ backgroundColor: '#5f6443' }}
                >
                  <span>Continuar</span>
                  <span>→</span>
                </button>

              </div>

              {/* BOTÃO COMPLEMENTAR CONTATO DIRETO WHATSAPP */}
              <button 
                onClick={() => window.open('https://wa.me/5514988396568', '_blank')}
                className="w-full bg-white font-medium py-3 rounded-xl border border-gray-200 text-sm flex items-center justify-center space-x-2 transition-colors hover:bg-gray-50"
                style={{ color: '#5f6443', borderColor: '#5f6443' }}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.488 1.451 5.416 1.452 5.347 0 9.7-4.35 9.704-9.7.002-2.592-1.007-5.029-2.844-6.867-1.837-1.837-4.275-2.846-6.87-2.847-5.353 0-9.707 4.35-9.712 9.7-.001 1.977.521 3.908 1.512 5.626l-.995 3.637 3.73-.978zm11.387-5.463c-.312-.156-1.848-.912-2.129-1.015-.282-.102-.487-.156-.69.156-.204.311-.79.99-.968 1.194-.179.204-.358.228-.67.072-1.442-.718-2.39-1.184-3.342-2.823-.252-.433.252-.402.721-1.336.078-.156.039-.294-.02-.45-.058-.156-.487-1.174-.667-1.607-.176-.423-.351-.365-.487-.372-.125-.006-.27-.007-.413-.007-.144 0-.379.054-.577.27-.198.216-.755.738-.755 1.8 0 1.061.773 2.086.88 2.232.109.146 1.522 2.323 3.687 3.257 1.796.774 2.164.62 2.554.583.389-.036 1.254-.512 1.431-1.006.177-.494.177-.917.123-1.006-.054-.09-.204-.144-.516-.3z"/>
                </svg>
                <span>Falar diretamente pelo WhatsApp</span>
              </button>
            </div>
          )}

          {/* PASSO 2: FORMULÁRIO DADOS */}
          {passo === 2 && (
            <div className="space-y-4">
              <p className="text-gray-600 font-medium">Informe seus dados:</p>
              
              <input 
                type="text" 
                placeholder="Nome completo" 
                className="w-full p-3 border border-gray-200 rounded-xl"
                value={dadosCliente.nome}
                onChange={(e) => setDadosCliente({...dadosCliente, nome: e.target.value})}
              />
              
              <input 
                type="tel" 
                placeholder="WhatsApp (com DDD)" 
                className="w-full p-3 border border-gray-200 rounded-xl"
                value={dadosCliente.whatsapp}
                onChange={(e) => setDadosCliente({...dadosCliente, whatsapp: e.target.value})}
              />

              <div className="flex items-center space-x-2 py-2">
                <input 
                  type="checkbox" 
                  id="salvarDados" 
                  className="w-5 h-5"
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem('clienteSalvo', JSON.stringify(dadosCliente));
                    } else {
                      localStorage.removeItem('clienteSalvo');
                    }
                  }}
                />
                <label htmlFor="salvarDados" className="text-sm text-gray-600">
                  Salvar meus dados para a próxima compra
                </label>
              </div>

              <div className="flex space-x-2 pt-2">
                <button 
                  onClick={() => setPasso(1)} 
                  className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 flex-1"
                >
                  Voltar
                </button>
                <button 
                  disabled={!dadosCliente.nome || !dadosCliente.whatsapp}
                  onClick={() => setPasso(3)}
                  className="flex-1 text-white font-medium py-3 rounded-xl disabled:opacity-50"
                  style={{ backgroundColor: '#5f6443' }}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* PASSO 3: ENTREGA / RETIRADA E PIN */}
          {passo === 3 && (
            <div className="space-y-4 text-center text-sm">
              <p className="font-medium text-gray-600">Onde deseja receber?</p>
              <div className="grid grid-cols-2 gap-2 text-left">
                <button 
                  onClick={() => { setDadosCliente({...dadosCliente, tipoEntrega: 'Retirada'}); setAvisoRetirada(true); }}
                  className={`w-full p-3 border rounded-xl ${dadosCliente.tipoEntrega === 'Retirada' ? 'bg-gray-50' : ''}`}
                  style={{ borderColor: dadosCliente.tipoEntrega === 'Retirada' ? '#5f6443' : '#e5e7eb' }}
                >
                  <p className="font-bold text-gray-900">🏠 Retirada</p>
                </button>
                <button 
                  onClick={() => setDadosCliente({...dadosCliente, tipoEntrega: 'Entrega'})}
                  className={`w-full p-3 border rounded-xl ${dadosCliente.tipoEntrega === 'Entrega' ? 'bg-gray-50' : ''}`}
                  style={{ borderColor: dadosCliente.tipoEntrega === 'Entrega' ? '#5f6443' : '#e5e7eb' }}
                >
                  <p className="font-bold text-gray-900">🛵 Entrega</p>
                </button>
              </div>

              {/* CAMPOS DE ENTREGA */}
              {dadosCliente.tipoEntrega === 'Entrega' && (
                <div className="space-y-3 text-left animate-in fade-in">
                  <input 
                    placeholder="Digite seu CEP" 
                    className="w-full p-3 border border-gray-200 rounded-xl"
                    value={dadosCliente.cep}
                    onChange={(e) => { setDadosCliente({...dadosCliente, cep: e.target.value}); buscarCep(e.target.value); }}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input placeholder="Rua" className="p-3 border rounded-xl bg-gray-50" value={dadosCliente.rua} readOnly />
                    <input placeholder="Nº" className="p-3 border rounded-xl" value={dadosCliente.numero} onChange={(e) => setDadosCliente({...dadosCliente, numero: e.target.value})} />
                  </div>
                  <input placeholder="Bairro" className="w-full p-3 border rounded-xl bg-gray-50" value={dadosCliente.bairro} readOnly />
                  <input placeholder="Complemento" className="w-full p-3 border rounded-xl" value={dadosCliente.complemento} onChange={(e) => setDadosCliente({...dadosCliente, complemento: e.target.value})} />
                  
                  <p className="text-xs text-blue-700 bg-blue-50 p-2 rounded-md font-medium text-center">
                    ⏰ Tempo estimado: 40 a 60 min. - Taxa fixa: apenas R$ 10,00
                  </p>

                  <select className="w-full p-3 border rounded-xl" value={dadosCliente.agendamento} onChange={(e) => setDadosCliente({...dadosCliente, agendamento: e.target.value})}>
                    <option value="imediato">Entrega Imediata</option>
                    <option value="agendado">Agendar para outro dia/hora</option>
                  </select>

                  {dadosCliente.agendamento === 'agendado' && (
                    <div className="grid grid-cols-2 gap-2">
                      <input type="date" className="p-3 border rounded-xl" value={dadosCliente.data} onChange={(e) => setDadosCliente({...dadosCliente, data: e.target.value})} />
                      <input type="time" className="p-3 border rounded-xl" value={dadosCliente.horario} onChange={(e) => setDadosCliente({...dadosCliente, horario: e.target.value})} />
                    </div>
                  )}

                  <select className="w-full p-3 border rounded-xl" value={dadosCliente.tipoImovel} onChange={(e) => setDadosCliente({...dadosCliente, tipoImovel: e.target.value})}>
                    <option value="">Tipo de imóvel</option>
                    <option value="Casa">Casa</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Comercial">Comercial</option>
                  </select>

                  <textarea placeholder="Observações para o entregador" className="w-full p-3 border rounded-xl h-20" value={dadosCliente.obsEntregador} onChange={(e) => setDadosCliente({...dadosCliente, obsEntregador: e.target.value})} />

                  <label className="block text-xs font-bold text-gray-600">Defina seu PIN de segurança para essa entrega (4 dígitos)</label>
                  <input type="number" placeholder="1234" value={dadosCliente.pin} className="w-full p-3 border rounded-xl" onChange={(e) => setDadosCliente({...dadosCliente, pin: e.target.value.slice(0, 4)})} />
                </div>
              )}

{/* BOTÕES DE CONTROLE */}
<div className="flex space-x-2 pt-4">
                <button 
                  type="button"
                  onClick={() => setPasso(2)} 
                  className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 flex-1 text-gray-700 font-medium"
                >
                  Voltar
                </button>
                <button 
                  type="button"
                  onClick={() => setPasso(4)} 
                  disabled={dadosCliente.tipoEntrega === 'Entrega' && (!dadosCliente.pin || dadosCliente.pin.length < 4)}
                  className="flex-1 text-white font-medium py-3 rounded-xl disabled:opacity-50 transition-all" 
                  style={{ backgroundColor: '#5f6443' }}
                >
                  Ir para o Pagamento
                </button>
              </div>
              </div>
         )}

         {/* PASSO 4 - PAGAMENTO */}
         {passo === 4 && (
           <div className="space-y-6 animate-fadeIn">
             <p className="text-center text-sm font-medium text-gray-600 my-2">Como deseja pagar?</p>
              
              <div className="space-y-3">
                {/* Opção Pix */}
                <button
                  type="button"
                  onClick={() => { setFormaPagamento('pix'); setTrocoPara(''); }}
                  className={`w-full p-4 border rounded-xl flex items-center justify-between transition-all ${
                    formaPagamento === 'pix' ? 'border-[#5f6443] bg-[#5f6443]/5' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📱</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800 text-sm">Pix</p>
                      <p className="text-xs text-gray-500">Chave Pix será encaminhada</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: formaPagamento === 'pix' ? '#5f6443' : '#d1d5db' }}>
                  {formaPagamento === 'pix' && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#5f6443' }} />}
                </div>
                </button>

                {/* Opção Cartão na Entrega */}
                <button
                  type="button"
                  onClick={() => { setFormaPagamento('cartao_entrega'); setTrocoPara(''); }}
                  className={`w-full p-4 border rounded-xl flex items-center justify-between transition-all ${
                    formaPagamento === 'cartao_entrega' ? 'border-[#5f6443] bg-[#5f6443]/5' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">💳</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800 text-sm">Crédito ou Débito</p>
                      <p className="text-xs text-gray-500">Levar maquininha na entrega ou retirada</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: formaPagamento === 'cartao_entrega' ? '#5f6443' : '#d1d5db' }}>
                  {formaPagamento === 'cartao_entrega' && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#5f6443' }} />}
                </div>
                </button>

                {/* Opção Dinheiro */}
                <button
                  type="button"
                  onClick={() => setFormaPagamento('dinheiro')}
                  className={`w-full p-4 border rounded-xl flex items-center justify-between transition-all ${
                    formaPagamento === 'dinheiro' ? 'border-[#5f6443] bg-[#5f6443]/5' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">💵</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800 text-sm">Dinheiro</p>
                      <p className="text-xs text-gray-500">Pagar na retirada ou entrega</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: formaPagamento === 'dinheiro' ? '#5f6443' : '#d1d5db' }}>
                  {formaPagamento === 'dinheiro' && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#5f6443' }} />}
                </div>
                </button>

{/* Opção Vale Alimentação/Refeição */}
<button
                  type="button"
                  onClick={() => { 
                    setFormaPagamento('Vale Refeição/Alimentação'); 
                    setModalValeAberto(true); 
                  }}
                  className={`w-full p-4 border rounded-xl flex items-center justify-between transition-all ${
                    formaPagamento === 'Vale Refeição/Alimentação' ? 'border-[#5f6443] bg-[#5f6443]/5' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">💳</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800 text-sm">Vale Refeição/Alimentação</p>
                      {/* Aqui é o luxo: Mostra a bandeira escolhida ou o texto padrão */}
                      <p className="text-xs text-gray-500">
                        {bandeiraVale ? (
                          <span className="font-bold text-[#5f6443]">Bandeira: {bandeiraVale}</span>
                        ) : (
                          'Escolha sua bandeira (Alelo, Ticket...)'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: formaPagamento === 'Vale Refeição/Alimentação' ? '#5f6443' : '#d1d5db' }}>
                    {formaPagamento === 'Vale Refeição/Alimentação' && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#5f6443' }} />}
                  </div>
                </button>

              </div>

              {/* Input de Troco dinâmico (só aparece se escolher dinheiro) */}
              {formaPagamento === 'dinheiro' && (
                <div className="space-y-2 animate-fadeIn">
                  <label className="block text-xs font-bold text-gray-600">Precisa de troco para quanto?</label>
                  <input
                    type="text"
                    placeholder="Ex: R$ 50,00 (Deixe em branco se não precisar)"
                    value={trocoPara}
                    onChange={(e) => setTrocoPara(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              )}

              {/* BOTÕES DE CONTROLE DO PASSO 4 */}
              <div className="flex space-x-2 pt-4">
                <button 
                  type="button"
                  onClick={() => setPasso(3)} 
                  className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 flex-1 text-gray-700 font-medium"
                >
                  Voltar
                </button>
                <button 
                  type="button"
                  onClick={finalizarPedido} 
                  disabled={!formaPagamento}
                  className="flex-1 text-white font-medium py-3 rounded-xl disabled:opacity-50 transition-all flex items-center justify-center space-x-2" 
                  style={{ backgroundColor: '#5f6443' }}
                >
                  <span>Finalizar Pedido</span>
                  <span>🚀</span>
                  </button>
              </div>
            </div>
          )}
        </div>

        {/* RODAPÉ MARCA */}
        <div className="text-center text-[10px] text-gray-400 pt-2 flex flex-col items-center justify-center space-y-1">
          <span>🌿</span>
          <span>Uma empresa do Grupo Sávea®</span>
        </div>
      </div>

      {/* JANELA JANELINHA POP-UP (MODAL) DE SABORES COBERTA POR CIMA DO SITE */}
      {modalSabor.aberto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl border border-gray-100 animate-fadeIn text-gray-800">
            <div className="text-center mb-4">
              <span className="text-2xl"> </span>
              <h3 className="font-bold text-lg mt-1" style={{ color: '#444631' }}>Escolha o Adicional Gratuito - 30g</h3>
              <p className="text-xs text-gray-400 mt-0.5">Selecione o sabor para a unidade {modalSabor.itemIndex}</p>
            </div>
            
            <div className="space-y-2">
              {SABORES_RECHEIO.map(sabor => (
                <button
                  key={sabor}
                  onClick={() => selecionarSabor(sabor)}
                  className="w-full text-left p-3 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span>{sabor}</span>
                  <span style={{ color: '#5f6443' }}>➔</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setModalSabor({ aberto: false, produtoId: null, itemIndex: 0 })}
              className="w-full mt-4 text-center py-2 text-xs font-semibold text-gray-400 hover:text-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {avisoRetirada && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl border border-gray-100">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg text-gray-800">Retiradas em breve</h3>
            <p className="text-sm text-gray-500 mt-2 mb-6">No momento, as retiradas estão desabilitadas. Por favor, escolha a opção de entrega.</p>
            <button 
              onClick={() => setAvisoRetirada(false)} 
              className="w-full py-3 rounded-xl text-white font-medium"
              style={{ backgroundColor: '#5f6443' }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
      {/* JANELA JANELINHA POP-UP (MODAL) DE VALES ACEITOS */}
      {modalValeAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl border border-gray-100 text-gray-800">
            <div className="text-center mb-4">
              <span className="text-4xl">💳</span>
              <h3 className="font-bold text-lg mt-2" style={{ color: '#444631' }}>Qual é o seu Vale?</h3>
              <p className="text-sm text-gray-500 mt-1">Selecione a bandeira para levarmos a maquininha certa:</p>
            </div>
            
            {/* Grade com os botões das bandeiras */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              
              <button onClick={() => { setBandeiraVale('Alelo'); setModalValeAberto(false); }} className={`p-4 border rounded-xl flex items-center justify-center transition-all ${bandeiraVale === 'Alelo' ? 'border-[#007a53] bg-[#007a53]/10 ring-2 ring-[#007a53]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <span className="font-bold text-[#007a53] text-lg tracking-tight">alelo</span>
              </button>

              <button onClick={() => { setBandeiraVale('Ticket'); setModalValeAberto(false); }} className={`p-4 border rounded-xl flex items-center justify-center transition-all ${bandeiraVale === 'Ticket' ? 'border-[#d8242a] bg-[#d8242a]/10 ring-2 ring-[#d8242a]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <span className="font-bold text-[#d8242a] text-lg">Ticket</span>
              </button>

              <button onClick={() => { setBandeiraVale('Pluxee'); setModalValeAberto(false); }} className={`p-4 border rounded-xl flex items-center justify-center transition-all ${bandeiraVale === 'Pluxee' ? 'border-[#351f65] bg-[#351f65]/10 ring-2 ring-[#351f65]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <span className="font-bold text-[#351f65] text-lg tracking-tight">pluxee</span>
              </button>

              <button onClick={() => { setBandeiraVale('VR Benefícios'); setModalValeAberto(false); }} className={`p-4 border rounded-xl flex items-center justify-center transition-all ${bandeiraVale === 'VR Benefícios' ? 'border-[#008238] bg-[#008238]/10 ring-2 ring-[#008238]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <span className="font-bold text-[#008238] text-lg italic">VR</span>
              </button>

              <button onClick={() => { setBandeiraVale('Green Card'); setModalValeAberto(false); }} className={`col-span-2 p-4 border rounded-xl flex items-center justify-center transition-all ${bandeiraVale === 'Green Card' ? 'border-[#5c9f4d] bg-[#5c9f4d]/10 ring-2 ring-[#5c9f4d]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <span className="font-bold text-[#5c9f4d] text-lg italic">GreenCard</span>
              </button>

            </div>

            <button
              onClick={() => setModalValeAberto(false)}
              className="w-full py-3 rounded-xl text-gray-500 font-medium hover:bg-gray-100 transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      )}

    </div>
    {/* O MODAL FICA AQUI, SOLTO E LIVRE */}
    {lojaFechada && <ModalFechado mensagem="No momento estamos fechados. Fique ligado em nossas redes sociais!" />}
    </>
  );
}