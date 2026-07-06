'use client';
import { useState } from 'react';

const TailwindScript = () => (
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
);

const PRODUTOS = [
  { id: 'tradicional', nome: 'Mini Cookies Tradicionais', desc: '12 unidades - Com gotas de chocolate', preco: 10.90, duplo: 19.00, foto: '/cookie-tradicional.png' },
  { id: 'bites', nome: 'Cookie Bites', desc: '12 unidades - banhados no chocolate ao leite', preco: 11.90, duplo: 20.00, foto: '/cookie-nutella.png' },
  { id: 'kitkat', nome: 'Cookie KitKat', desc: 'Creme de KitKat', preco: 18.90, duplo: 36.00, foto: '/cookie-kitkat.png' },
  { id: 'pringles', nome: 'Cookie Pringles', desc: 'Recheado com Chocolate Nobre e Pringles', preco: 18.90, duplo: 36.00, foto: '/cookie-pringles.png' },
];
const CATEGORIAS = ['Mini Cookies', 'Cookies Tamanhos Normais'];

export default function CardapioDigital() {
  const [passo, setPasso] = useState(1);
  const [quantidades, setQuantidades] = useState<Record<string, number>>({
    tradicional: 0, nutella: 0, kitkat: 0, pringles: 0
  });
  
  const [dadosCliente, setDadosCliente] = useState({
    nome: '', whatsapp: '', data: '2026-07-06', horario: '15:30', observacoes: ''
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
      if (qtd > 0) itensTexto += `- ${qtd}x ${p.nome}\n`;
    });

    const textoFormatado = `*Novo Pedido - Doceria Sávea* 🍪\n\n` +
      `*Cliente:* ${dadosCliente.nome}\n` +
      `*WhatsApp:* ${dadosCliente.whatsapp}\n` +
      `*Retirada:* ${dadosCliente.data} às ${dadosCliente.horario}\n` +
      `*Preferência:* ${experiencia}\n` +
      `${dadosCliente.observacoes ? `*Obs:* ${dadosCliente.observacoes}\n` : ''}\n` +
      `*Itens do Pedido:*\n${itensTexto}\n` +
      `*Total:* R$ ${valorTotal.toFixed(2).replace('.', ',')}`;

    const numeroWhats = "5514999999999"; // Coloque seu número aqui
    window.open(`https://wa.me/${numeroWhats}?text=${encodeURIComponent(textoFormatado)}`, '_blank');
  };

  return (
    <div className="relative min-h-screen flex items-start justify-center px-4 py-6" style={{ backgroundColor: '#f3eae1', fontFamily: 'sans-serif' }}>
      <TailwindScript />
      <div className="w-full max-w-xl mx-auto space-y-4">
        
        {/* LOGO E TOPO IDENTICO A IMAGEM */}
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

          {/* PASSOS COR RIGIDOS COM VERDE OLIVA */}
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

          {/* PASSO 1: LISTA DOS COOKIES COM DESIGN IGUAL DA FOTO */}
          {passo === 1 && (
            <div className="space-y-3">
              {PRODUTOS.map(p => (
                <div key={p.id} className="rounded-xl border border-gray-100 p-3 bg-white flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    {/* Espaço da foto redonda do cookie */}
                    <img src={p.foto} alt={p.nome} className="w-16 h-16 rounded-full object-cover bg-gray-50 border border-gray-100 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">{p.nome}</h3>
                      <p className="text-[11px] text-gray-400">{p.desc}</p>
                      <div className="mt-1 flex items-center space-x-2 flex-wrap">
                        <span className="text-sm font-bold" style={{ color: '#5f6443' }}>R$ {p.preco.toFixed(2).replace('.', ',')}</span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#f6f5ea', color: '#5f6443', border: '1px solid #e2dfcc' }}>
                          2 por R$ {p.duplo.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* BOTÕES VERDE OLIVA DA COR DA SUA IMAGEM */}
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
              ))}

              {/* TABELA DE SUBTOTAL TOTAL */}
              <div className="rounded-xl p-4 mt-6 text-xs space-y-2" style={{ backgroundColor: '#fbf7f0' }}>
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
                className="w-full text-white font-medium py-3 rounded-xl mt-4 transition-colors disabled:opacity-50 flex items-center justify-center space-x-1"
                style={{ backgroundColor: '#5f6443' }}
              >
                <span>Continuar</span>
                <span>→</span>
              </button>

              {/* BOTÃO COMPLEMENTAR CONTATO DIRETO WHATSAPP */}
              <button 
                onClick={() => window.open('https://wa.me/5514999999999', '_blank')}
                className="w-full bg-white font-medium py-3 rounded-xl border border-gray-200 text-sm flex items-center justify-center space-x-2 transition-colors hover:bg-gray-50"
                style={{ color: '#5f6443', borderColor: '#5f6443' }}
              >
                <span>💬</span>
                <span>Falar diretamente pelo WhatsApp</span>
              </button>
            </div>
          )}

          {/* PASSO 2: FORMULÁRIO DADOS */}
          {passo === 2 && (
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Nome completo</label>
                <input type="text" value={dadosCliente.nome} onChange={e => setDadosCliente({...dadosCliente, nome: e.target.value})} placeholder="Seu nome" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-green-700" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">WhatsApp</label>
                <input type="text" value={dadosCliente.whatsapp} onChange={e => setDadosCliente({...dadosCliente, whatsapp: e.target.value})} placeholder="(00) 00000-0000" className="w-full p-3 border border-gray-200 rounded-xl outline-none" />
              </div>
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <label className="block text-xs font-bold text-gray-600 mb-1">Data</label>
                  <input type="date" value={dadosCliente.data} onChange={e => setDadosCliente({...dadosCliente, data: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none" />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs font-bold text-gray-600 mb-1">Horário</label>
                  <input type="time" value={dadosCliente.horario} onChange={e => setDadosCliente({...dadosCliente, horario: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Observações (opcional)</label>
                <textarea value={dadosCliente.observacoes} onChange={e => setDadosCliente({...dadosCliente, observacoes: e.target.value})} placeholder="Alguma preferência?" className="w-full p-3 border border-gray-200 rounded-xl outline-none h-16 resize-none" />
              </div>
              <div className="flex space-x-2 pt-2">
                <button onClick={() => setPasso(1)} className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50">Voltar</button>
                <button disabled={!dadosCliente.nome || !dadosCliente.whatsapp} onClick={() => setPasso(3)} className="flex-1 text-white font-medium py-3 rounded-xl disabled:opacity-50" style={{ backgroundColor: '#5f6443' }}>Continuar</button>
              </div>
            </div>
          )}

          {/* PASSO 3: EXPERIÊNCIA / ENTREGA */}
          {passo === 3 && (
            <div className="space-y-4 text-center text-sm">
              <p className="text-gray-600 font-medium">Como deseja consumir seus cookies?</p>
              <div className="space-y-2 text-left">
                <button onClick={() => setExperiencia('Vou comer logo após a retirada')} className={`w-full p-3 border rounded-xl block ${experiencia === 'Vou comer logo após a retirada' ? 'bg-gray-50' : ''}`} style={{ borderColor: experiencia === 'Vou comer logo após a retirada' ? '#5f6443' : '#e5e7eb' }}>
                  <p className="font-bold text-gray-900">🍴 Vou comer logo após a retirada</p>
                </button>
                <button onClick={() => setExperiencia('Vou comer mais tarde')} className={`w-full p-3 border rounded-xl block ${experiencia === 'Vou comer mais tarde' ? 'bg-gray-50' : ''}`} style={{ borderColor: experiencia === 'Vou comer mais tarde' ? '#5f6443' : '#e5e7eb' }}>
                  <p className="font-bold text-gray-900">❄️ Vou comer mais tarde</p>
                </button>
              </div>
              <div className="flex space-x-2 pt-2">
                <button onClick={() => setPasso(2)} className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50">Voltar</button>
                <button disabled={!experiencia} onClick={finalizarPedido} className="flex-1 text-white font-medium py-3 rounded-xl disabled:opacity-50" style={{ backgroundColor: '#5f6443' }}>Confirmar pedido</button>
              </div>
            </div>
          )}

          <div className="text-center mt-5 text-[11px] text-gray-400">🔒 Pagamento feito pessoalmente, na retirada.</div>
        </div>
        
        {/* RODAPÉ MARCA */}
        <div className="text-center text-[10px] text-gray-400 pt-2 flex flex-col items-center justify-center space-y-1">
          <span>🌿</span>
          <span>Uma empresa do Grupo Sávea®</span>
        </div>
      </div>
    </div>
  );
}