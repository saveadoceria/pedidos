'use client';
import { useState, useEffect } from 'react';

const TailwindScript = () => (
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
);

const PRODUTOS = [
  { id: 'tradicional', nome: 'Mini Cookies Tradicionais', desc: '12 unidades - Escolha o recheio', preco: 10.90, duplo: 19.00, foto: '/cookie-tradicional.png', categoria: 'Mini Cookies' },
  { id: 'bites', nome: 'Cookie Bites', desc: '12 unidades - Escolha o recheio', preco: 11.90, duplo: 20.00, foto: '/cookie-nutella.png', categoria: 'Mini Cookies' },
  { id: 'kitkat', nome: 'Cookie KitKat', desc: 'Creme de KitKat', preco: 18.90, duplo: 36.00, foto: '/cookie-kitkat.png', categoria: 'Cookies Tamanhos Normais' },
  { id: 'pringles', nome: 'Cookie Pringles', desc: 'Recheado com Chocolate Nobre e Pringles', preco: 18.90, duplo: 36.00, foto: '/cookie-pringles.png', categoria: 'Cookies Tamanhos Normais' },
];
const CATEGORIAS = ['Mini Cookies', 'Cookies Tamanhos Normais'];

// VOCÊ PODE ALTERAR OU ADICIONAR MAIS SABORES AQUI:
const SABORES_RECHEIO = ['Nutella', 'Doce de Leite', 'Ninho', 'Chocolate Meio Amargo'];

export default function CardapioDigital() {
  const [passo, setPasso] = useState(1);
  const [quantidades, setQuantidades] = useState<Record<string, number>>({
    tradicional: 0, bites: 0, kitkat: 0, pringles: 0
  });
  
  // Guarda os sabores escolhidos para cada unidade de mini cookie adicionada
  const [saboresEscolhidos, setSaboresEscolhidos] = useState<{produtoId: string, itemIndex: number, sabor: string}[]>([]);
  
  // Controle da janela (modal) de escolha de sabor
  const [modalSabor, setModalSabor] = useState<{ aberto: boolean, produtoId: string | null, itemIndex: number }>({
    aberto: false,
    produtoId: null,
    itemIndex: 0
  });

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
      totalItens += qtd;
      const pares = Math.floor(qtd / 2);
      const sobras = qtd % 2;
      valorTotal += (pares * p.duplo) + (sobras * p.preco);
    });
    return { totalItens, valorTotal };
  };

  const { totalItens, valorTotal } = calcularTotal();

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

    const agendamentoTexto = dadosCliente.agendamento === 'agendado' 
      ? `📅 *Agendado para:* ${dadosCliente.data} às ${dadosCliente.horario}`
      : `⚡ *Entrega:* Imediata`;

    const enderecoTexto = dadosCliente.tipoEntrega === 'Entrega'
      ? `📍 *Endereço:* ${dadosCliente.rua}, Nº ${dadosCliente.numero}\n` +
        `*Bairro:* ${dadosCliente.bairro} - ${dadosCliente.cidade}\n` +
        (dadosCliente.complemento ? `*Complemento:* ${dadosCliente.complemento}\n` : '') +
        `*Tipo de Imóvel:* ${dadosCliente.tipoImovel || 'Não informado'}\n` +
        (dadosCliente.obsEntregador ? `*Obs. Entregador:* ${dadosCliente.obsEntregador}\n` : '')
      : `🏠 *Retirada no Local*`;

      let pagamentoTexto = '';
      if (formaPagamento === 'pix') {
        pagamentoTexto = '*💳 Pagamento:* Pix';
      } else if (formaPagamento === 'cartao_entrega') {
        pagamentoTexto = '*💳 Pagamento:* Cartão na Entrega (Levar Maquininha)';
      } else if (formaPagamento === 'dinheiro') {
        if (trocoPara) {
          pagamentoTexto = `*💵 Pagamento:* Dinheiro (Troco para R$ ${trocoPara})`;
        } else {
          pagamentoTexto = '*💵 Pagamento:* Dinheiro (Não precisa de troco)';
        }
      }
    
      const textoFormatado = `*🧁 Novo Pedido - Doceria Sávea* 🍪\n\n` +
        `*Cliente:* ${dadosCliente.nome}\n` +
        `*WhatsApp:* ${dadosCliente.whatsapp}\n\n` +
        `${enderecoTexto}\n` +
        `${agendamentoTexto}\n` +
        `🔐 *PIN de Segurança:* ${dadosCliente.pin || 'Não definido'}\n\n` +
        `*Itens do Pedido:*\n${itemsTexto}\n` +
        `*Total:* R$ ${valorTotal.toFixed(2).replace('.', ',')}\n` +
        `${pagamentoTexto}`;
      
    const numeroWhats = "5514999999999"; 
    window.open(`https://wa.me/${numeroWhats}?text=${encodeURIComponent(textoFormatado)}`, '_blank');
  };

  return (
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
            <div className="rounded-xl p-3 flex items-start space-x-3 mb-5 text-xs" style={{ backgroundColor: '#fbf7f0', border: '1px solid #ebdcc5' }}>
              <span className="text-lg">🌱</span>
              <div>
                <p className="font-bold text-gray-800">Produção artesanal</p>
                <p className="text-gray-500">Seus doces são preparados frescos para garantir o máximo de qualidade e sabor.</p>
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
                                  <span className="text-sm font-bold" style={{ color: '#5f6443' }}>R$ {p.preco.toFixed(2).replace('.', ',')}</span>
                                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#f6f5ea', color: '#5f6443', border: '1px solid #e2dfcc' }}>
                                    2 por R$ {p.duplo.toFixed(2).replace('.', ',')}
                                  </span>
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
                    <span>R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Entrega</span>
                    <span>A calcular</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-gray-300 pt-2 font-bold text-sm text-gray-900">
                    <span>TOTAL</span>
                    <span className="text-lg" style={{ color: '#444631' }}>R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
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
                onClick={() => window.open('https://wa.me/5514999999999', '_blank')}
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
              <p className="font-medium text-gray-600">Como deseja receber?</p>
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
                    ⏰ Tempo estimado: 40 a 60 min.
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

                  <textarea placeholder="Obs. para o entregador" className="w-full p-3 border rounded-xl h-20" value={dadosCliente.obsEntregador} onChange={(e) => setDadosCliente({...dadosCliente, obsEntregador: e.target.value})} />

                  <label className="block text-xs font-bold text-gray-600">Defina seu PIN (4 dígitos)</label>
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
                      <p className="text-xs text-gray-500">Chave Pix na próxima tela</p>
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
                      <p className="font-semibold text-gray-800 text-sm">Cartão na Entrega</p>
                      <p className="text-xs text-gray-500">Levar maquininha (Crédito/Débito)</p>
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
              <h3 className="font-bold text-lg mt-1" style={{ color: '#444631' }}>Escolha o Recheio - 30g</h3>
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

    </div>
  );
}