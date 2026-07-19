'use client';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);

  useEffect(() => {
    const carregarPedidos = async () => {
      // Busca a coleção "pedidos"
      const querySnapshot = await getDocs(collection(db, "pedidos"));
      const lista: any[] = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setPedidos(lista);
    };
    carregarPedidos();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Lista de Pedidos</h1>
      {pedidos.map((pedido) => (
        <div key={pedido.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}>
          <p><strong>Data:</strong> {pedido.data}</p>
          <p><strong>Cliente:</strong> {pedido.cliente?.nome}</p>
          <p><strong>Total:</strong> {pedido.total}</p>
          <p><strong>Itens:</strong></p>
          <pre style={{ background: '#f4f4f4', padding: '5px' }}>{pedido.itens}</pre>
        </div>
      ))}
    </div>
  );
}