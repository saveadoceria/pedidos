'use client';
import { useState } from 'react';

// Forçando o carregamento do visual caso o projeto base não tenha Tailwind nativo ativo
const TailwindScript = () => (
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
);

const PRODUTOS = [
  { id: 'tradicional', nome: 'Mini Cookies Tradicionais', desc: '12 unidades', preco: 10.00, duplo: 18.00 },
  { id: 'duplo tradicional', nome: 'Mini Cookies Banhados', desc: '12 unidades banhadas em chocolate', preco: 10.00, duplo: 18.00 },
  { id: 'kitkat', nome: 'Cookie KitKat', desc: 'Creme de KitKat', preco: 18.90, duplo: 36.00 },
  { id: 'pringles', nome: 'Cookie Pringles', desc: 'Recheado com Chocolate Nobre e Pringles', preco: 18.90, duplo: 36.00 },
];

export default function CardapioDigital() {
  const [passo, setPasso] = useState(1);
  const [quantidades, setQuantidades] = useState<Record<string, number>>({
    tradicional: 0, nutella: 0, kitkat: 0, pringles: 0
  });
  
  const [dadosCliente, setDadosCliente] = useState({
    nome: '',
    whatsapp: '',
    data: '2026-07-06',
    horario: '15:30',
    observacoes: ''
  });
  
  const [experiencia, setExperiencia] = useState('');

  const alterarQtd = (id: string, operacao: 'mais' | 'menos') => {
    setQuantidades(prev => {
      const atual = prev[id] || 0;
      const novaQtd = operacao === 'mais' ? atual + 1 : Math.max(0, atual - 1);
      return { ...prev, [id]: novaQtd };
    });
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
    let itensTexto = '';
    PRODUTOS.forEach(p => {
      const qtd = quantidades[p.id];
      if (qtd > 0) {
        itensTexto += `- ${qtd}x ${p.nome}\n`;
      }
    });

    const textoFormatado = `*Novo Pedido - Doceria Sávea* 🍪\n\n` +
      `*Cliente:* ${dadosCliente.nome}\n` +
      `*WhatsApp:* ${dadosCliente.whatsapp}\n` +
      `*Retirada:* ${dadosCliente.data} às ${dadosCliente.horario}\n` +
      `*Preferência:* ${experiencia}\n` +
      `${dadosCliente.observacoes ? `*Obs:* ${dadosCliente.observacoes}\n` : ''}\n` +
      `*Itens do Pedido:*\n${itensTexto}\n` +
      `*Total:* R$ ${valorTotal.toFixed(2).replace('.', ',')}`;

    const numeroWhats = "5514988396568"; // Lembre de por seu número aqui
    window.open(`https://wa.me/${numeroWhats}?text=${encodeURIComponent(textoFormatado)}`, '_blank');
  };

  return (
    <div className="relative min-h-screen flex items-start sm:items-center justify-center px-4 py-8" style={{ backgroundColor: '#dfb17d', fontFamily: 'sans-serif' }}>
      <TailwindScript />
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-gray-800">
          
          {/* Cabeçalho Fixo */}
          <div className="text-center mb-6" style={{ color: '#78350f' }}>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">Faça seu pedido</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Escolha seus cookies, informe seus dados e retire pessoalmente.</p>
          </div>

          {/* Barra de Progresso / Passos */}
          <div className="flex items-center justify-center space-x-2 mb-6 text-xs font-semibold">
            <div className={`px-3 py-1 rounded-full ${passo >= 1 ? 'bg-yellow-800 text-white' : 'bg-gray-100 text-gray-400'}`}>1. Sabores</div>
            <div className="w-6 h-0.5 bg-gray-200" />
            <div className={`px-3 py-1 rounded-full ${passo >= 2 ? 'bg-yellow-800 text-white' : 'bg-gray-100 text-gray-400'}`}>2. Dados</div>
            <div className="w-6 h-0.5 bg-gray-200" />
            <div className={`px-3 py-1 rounded-full ${passo >= 3 ? 'bg-yellow-800 text-white' : 'bg-gray-100 text-gray-400'}`}>3. Experiência</div>
          </div>

          {/* PASSO 1: CARDÁPIO */}
          {passo === 1 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Escolha seus cookies</p>
              {PRODUTOS.map(p => (
                <div key={p.id} className="rounded-xl border border-gray-200 p-4 bg-white flex justify-between items-center mb-3">
                  <div className="pr-2">
                    <h3 className="font-bold text-base text-gray-900">{p.nome}</h3>
                    <p className="text-xs text-gray-500">{p.desc}</p>
                    <div className="mt-1 flex items-center space-x-2 flex-wrap">
                      <span className="text-sm font-bold text-yellow-800">R$ {p.preco.toFixed(2).replace('.', ',')}</span>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        2 por R$ {p.duplo.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button 
                      onClick={() => alterarQtd(p.id, 'menos')}
                      className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 bg-gray-50 hover:bg-gray-100"
                    >-</button>
                    <span className="w-6 text-center font-bold text-sm">{quantidades[p.id] || 0}</span>
                    <button 
                      onClick={() => alterarQtd(p.id, 'mais')}
                      className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 bg-gray-50 hover:bg-gray-100"
                    >+</button>
                  </div>
                </div>
              ))}

              <div className="rounded-xl bg-gray-50 p-4 mt-4 text-sm space-y-1 border border-gray-100">
                <div className="flex justify-between text-gray-500">
                  <span>{totalItens} cookies</span>
                  <span>R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-base text-gray-900">
                  <span>Total</span>
                  <span className="text-yellow-800">R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button 
                disabled={totalItens === 0}
                onClick={() => setPasso(2)}
                className="w-full bg-yellow-800 text-white font-semibold py-3 rounded-xl mt-4 hover:bg-yellow-900 transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#78350f' }}
              >
                Continuar
              </button>
            </div>
          )}

          {/* PASSO 2: FORMULÁRIO */}
          {passo === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Como deseja receber?</label>
                <div className="w-full p-3 border border-yellow-600 bg-yellow-50 text-yellow-900 rounded-xl text-center font-medium text-sm">
                  🏪 Retirar no local
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Nome completo</label>
                <input 
                  type="text" 
                  value={dadosCliente.nome}
                  onChange={e => setDadosCliente({...dadosCliente, nome: e.target.value})}
                  placeholder="Seu nome" 
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none text-sm focus:border-yellow-600" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">WhatsApp</label>
                <input 
                  type="text" 
                  value={dadosCliente.whatsapp}
                  onChange={e => setDadosCliente({...dadosCliente, whatsapp: e.target.value})}
                  placeholder="(00) 00000-0000" 
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none text-sm focus:border-yellow-600" 
                />
              </div>

              <div className="flex space-x-2">
                <div className="w-1/2">
                  <label className="block text-xs font-bold text-gray-600 mb-1">Data desejada</label>
                  <input 
                    type="date" 
                    value={dadosCliente.data}
                    onChange={e => setDadosCliente({...dadosCliente, data: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl outline-none text-sm" 
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs font-bold text-gray-600 mb-1">Horário</label>
                  <input 
                    type="time" 
                    value={dadosCliente.horario}
                    onChange={e => setDadosCliente({...dadosCliente, horario: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl outline-none text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Observações (opcional)</label>
                <textarea 
                  value={dadosCliente.observacoes}
                  onChange={e => setDadosCliente({...dadosCliente, observacoes: e.target.value})}
                  placeholder="Alguma preferência?" 
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none text-sm h-20 resize-none"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button onClick={() => setPasso(1)} className="px-4 py-3 border border-gray-300 font-semibold rounded-xl text-sm bg-gray-50 hover:bg-gray-100">
                  Voltar
                </button>
                <button 
                  disabled={!dadosCliente.nome || !dadosCliente.whatsapp}
                  onClick={() => setPasso(3)}
                  className="flex-1 text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50"
                  style={{ backgroundColor: '#78350f' }}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* PASSO 3: EXPERIÊNCIA */}
          {passo === 3 && (
            <div className="space-y-5 text-center">
              <p className="text-gray-700 text-sm font-medium">Quando você pretende saborear seus cookies?</p>

              <div className="space-y-2">
                <button 
                  onClick={() => setExperiencia('Vou comer logo após a retirada')}
                  className={`w-full p-4 border rounded-xl text-left transition-all block ${experiencia === 'Vou comer logo após a retirada' ? 'border-yellow-800 bg-yellow-50' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <p className="font-bold text-sm text-gray-900">🍴 Vou comer logo após a retirada</p>
                  <p className="text-xs text-gray-500 ml-5">Preparamos quentinho para você!</p>
                </button>

                <button 
                  onClick={() => setExperiencia('Vou comer mais tarde')}
                  className={`w-full p-4 border rounded-xl text-left transition-all block ${experiencia === 'Vou comer mais tarde' ? 'border-yellow-800 bg-yellow-50' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <p className="font-bold text-sm text-gray-900">❄️ Vou comer mais tarde</p>
                  <p className="text-xs text-gray-500 ml-5">Embalamos com cuidado para conservar fresquinho.</p>
                </button>
              </div>

              <div className="flex space-x-2 pt-2">
                <button onClick={() => setPasso(2)} className="px-4 py-3 border border-gray-300 font-semibold rounded-xl text-sm bg-gray-50 hover:bg-gray-100">
                  Voltar
                </button>
                <button 
                  disabled={!experiencia}
                  onClick={finalizarPedido}
                  className="flex-1 text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50"
                  style={{ backgroundColor: '#78350f' }}
                >
                  Confirmar pedido
                </button>
              </div>
            </div>
          )}

          <p className="text-[10px] text-gray-400 text-center mt-4">Pagamento feito pessoalmente, na retirada</p>
        </div>
      </div>
    </div>
  );
}