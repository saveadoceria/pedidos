'use client';
import { useState } from 'react';

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
const SABORES_RECHEIO = ['Nutella', 'Doce de Leite', 'Ninho', 'Chocolate Meio Amargo'];

export default function CardapioDigital() {
  const [passo, setPasso] = useState(1);
  const [quantidades, setQuantidades] = useState<Record<string, number>>({
    tradicional: 0, bites: 0, kitkat: 0, pringles: 0
  });
  
  const [saboresEscolhidos, setSaboresEscolhidos] = useState<{produtoId: string, itemIndex: number, sabor: string}[]>([]);
  const [modalSabor, setModalSabor] = useState<{ aberto: boolean, produtoId: string | null, itemIndex: number }>({
    aberto: false, produtoId: null, itemIndex: 0
  });

  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString('en-CA');
  const horarioFormatado = dataAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const [dadosCliente, setDadosCliente] = useState({
    nome: '', whatsapp: '', data: dataFormatada, horario: horarioFormatado, observacoes: '',
    tipoEntrega: '', pin: '' 
  });
  
  const alterarQtd = (id: string, operacao: 'mais' | 'menos') => {
    const produto = PRODUTOS.find(p => p.id === id);
    const qtdAtual = quantidades[id] || 0;
    if (operacao === 'mais') {
      if (produto?.categoria === 'Mini Cookies') {
        setModalSabor({ aberto: true, produtoId: id, itemIndex: qtdAtual + 1 });
      } else {
        setQuantidades(prev => ({ ...prev, [id]: qtdAtual + 1 }));
      }
    } else if (qtdAtual > 0) {
      setQuantidades(prev => ({ ...prev, [id]: qtdAtual - 1 }));
      if (produto?.categoria === 'Mini Cookies') {
        setSaboresEscolhidos(prev => {
          const filtrados = prev.filter(item => item.produtoId === id);
          filtrados.pop();
          return [...prev.filter(item => item.produtoId !== id), ...filtrados];
        });
      }
    }
  };

  const selecionarSabor = (sabor: string) => {
    if (modalSabor.produtoId) {
      const pId = modalSabor.produtoId;
      setSaboresEscolhidos(prev => [...prev, { produtoId: pId, itemIndex: modalSabor.itemIndex, sabor }]);
      setQuantidades(prev => ({ ...prev, [pId]: (prev[pId] || 0) + 1 }));
    }
    setModalSabor({ aberto: false, produtoId: null, itemIndex: 0 });
  };

  const calcularTotal = () => {
    let totalItens = 0, valorTotal = 0;
    PRODUTOS.forEach(p => {
      const qtd = quantidades[p.id] || 0;
      totalItens += qtd;
      valorTotal += (Math.floor(qtd / 2) * p.duplo) + ((qtd % 2) * p.preco);
    });
    return { totalItens, valorTotal: valorTotal + (dadosCliente.tipoEntrega === 'Entrega' ? 10 : 0) };
  };

  const { totalItens, valorTotal } = calcularTotal();

  const finalizarPedido = () => {
    let itensTexto = '';
    PRODUTOS.forEach(p => {
      const qtd = quantidades[p.id];
      if (qtd > 0) {
        if (p.categoria === 'Mini Cookies') {
          const saboresDeste = saboresEscolhidos.filter(s => s.produtoId === p.id).map(s => s.sabor);
          const contagem: Record<string, number> = {};
          saboresDeste.forEach(s => contagem[s] = (contagem[s] || 0) + 1);
          itensTexto += `- ${qtd}x ${p.nome}:\n`;
          Object.entries(contagem).forEach(([sab, q]) => itensTexto += `   • ${q}x Recheio de ${sab}\n`);
        } else {
          itensTexto += `- ${qtd}x ${p.nome}\n`;
        }
      }
    });

    const textoFormatado = `*Novo Pedido - Doceria Sávea* 🍪\n\n` +
      `*Cliente:* ${dadosCliente.nome}\n` +
      `*WhatsApp:* ${dadosCliente.whatsapp}\n` +
      `*Modo:* ${dadosCliente.tipoEntrega} | *PIN:* ${dadosCliente.pin}\n` +
      `*Retirada/Entrega:* ${dadosCliente.data} às ${dadosCliente.horario}\n` +
      `${dadosCliente.observacoes ? `*Obs:* ${dadosCliente.observacoes}\n` : ''}\n` +
      `*Itens do Pedido:*\n${itensTexto}\n` +
      `*Total (+Taxa se entrega):* R$ ${valorTotal.toFixed(2).replace('.', ',')}`;

    window.open(`https://wa.me/5514999999999?text=${encodeURIComponent(textoFormatado)}`, '_blank');
  };

  return (
    <div className="relative min-h-screen flex items-start justify-center px-4 py-6" style={{ backgroundColor: '#f3eae1', fontFamily: 'sans-serif' }}>
      <TailwindScript />
      <div className="w-full max-w-xl mx-auto space-y-4">
        
        <div className="text-center pt-4 pb-2">
          <div className="flex justify-center mb-2"><img src="/logo-savea.png" alt="Sávea Doceria" className="h-20 object-contain" /></div>
          <p className="text-xs italic tracking-wide" style={{ color: '#606246' }}>Doces de verdade, feitos com cuidado. ♡</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-gray-800">
          <div className="flex items-center justify-center space-x-2 mb-8 text-xs font-semibold">
            {[1, 2, 3].map(n => (
              <div key={n} className="text-center">
                <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-white ${passo >= n ? '' : 'bg-gray-200'}`} style={{ backgroundColor: passo >= n ? '#5f6443' : '' }}>{n}</div>
              </div>
            ))}
          </div>

          {passo === 1 && (
            <div className="space-y-6">
              {CATEGORIAS.map(categoria => {
                const prods = PRODUTOS.filter(p => p.categoria === categoria);
                return (
                  <div key={categoria} className="space-y-3">
                    <h2 className="text-base font-bold border-b border-gray-100 pb-1" style={{ color: '#444631' }}>{categoria}</h2>
                    {prods.map(p => (
                      <div key={p.id} className="rounded-xl border border-gray-100 p-3 bg-white flex justify-between items-center shadow-sm">
                        <div className="flex items-center space-x-3">
                          <img src={p.foto} alt={p.nome} className="w-16 h-16 rounded-full object-cover" />
                          <div>
                            <h3 className="font-bold text-sm">{p.nome}</h3>
                            <span className="text-sm font-bold" style={{ color: '#5f6443' }}>R$ {p.preco.toFixed(2).replace('.', ',')}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => alterarQtd(p.id, 'menos')} className="h-7 w-7 rounded-full bg-[#5f6443] text-white">-</button>
                          <span className="w-5 text-center font-bold">{quantidades[p.id] || 0}</span>
                          <button onClick={() => alterarQtd(p.id, 'mais')} className="h-7 w-7 rounded-full bg-[#5f6443] text-white">+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
              <div className="sticky bottom-0 bg-white p-4 border-t border-gray-100 shadow-lg z-40">
                <div className="font-bold text-lg mb-2">Total: R$ {valorTotal.toFixed(2).replace('.', ',')}</div>
                <button onClick={() => setPasso(2)} className="w-full text-white font-medium py-3 rounded-xl" style={{ backgroundColor: '#5f6443' }}>Continuar</button>
              </div>
            </div>
          )}

          {passo === 2 && (
            <div className="space-y-4 text-sm">
              <label>Nome: <input type="text" className="w-full p-2 border rounded" onChange={e => setDadosCliente({...dadosCliente, nome: e.target.value})} /></label>
              <label>WhatsApp: <input type="number" className="w-full p-2 border rounded" onChange={e => setDadosCliente({...dadosCliente, whatsapp: e.target.value})} /></label>
              <div className="flex space-x-2">
                <input type="date" className="w-1/2 p-2 border rounded" onChange={e => setDadosCliente({...dadosCliente, data: e.target.value})} />
                <input type="time" className="w-1/2 p-2 border rounded" onChange={e => setDadosCliente({...dadosCliente, horario: e.target.value})} />
              </div>
              <button onClick={() => setPasso(3)} className="w-full text-white py-3 rounded-xl" style={{ backgroundColor: '#5f6443' }}>Continuar</button>
            </div>
          )}

          {passo === 3 && (
            <div className="space-y-4 text-sm">
              <p className="font-bold text-center">Como deseja receber?</p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setDadosCliente({...dadosCliente, tipoEntrega: 'Retirada'})} className={`p-3 border rounded-xl ${dadosCliente.tipoEntrega === 'Retirada' ? 'bg-gray-100' : ''}`}>Retirada</button>
                <button onClick={() => setDadosCliente({...dadosCliente, tipoEntrega: 'Entrega'})} className={`p-3 border rounded-xl ${dadosCliente.tipoEntrega === 'Entrega' ? 'bg-gray-100' : ''}`}>Entrega</button>
              </div>
              {dadosCliente.tipoEntrega === 'Entrega' && <div className="p-2 bg-yellow-50 text-xs text-center font-bold">Taxa fixa Bauru: R$ 10,00</div>}
              <input type="number" placeholder="Defina um PIN (4 dígitos)" className="w-full p-3 border rounded-xl" onChange={e => setDadosCliente({...dadosCliente, pin: e.target.value.slice(0, 4)})} />
              <button onClick={finalizarPedido} disabled={!dadosCliente.tipoEntrega || dadosCliente.pin.length < 4} className="w-full text-white py-3 rounded-xl disabled:opacity-50" style={{ backgroundColor: '#5f6443' }}>Finalizar Pedido</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}