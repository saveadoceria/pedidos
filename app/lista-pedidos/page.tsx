'use client';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);

  useEffect(() => {
    // Busca simples e direta
    getDocs(collection(db, "pedidos")).then((snapshot) => {
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPedidos(lista);
    });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Lista de Pedidos</h1>
      
      {/* Botão de impressão nativo */}
      <button 
        onClick={() => window.print()} 
        style={{ padding: '10px 20px', marginBottom: '20px', cursor: 'pointer' }}
      >
        🖨️ Imprimir Pedidos
      </button>

      {pedidos.map((pedido) => (
        <div key={pedido.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p><strong>Cliente:</strong> {pedido.cliente?.nome}</p>
          <p><strong>Total:</strong> {pedido.total}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}