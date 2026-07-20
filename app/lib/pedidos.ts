import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function salvarPedido(pedido: any) {
  try {
    const docRef = await addDoc(collection(db, "pedidos"), {
      ...pedido,
      criadoEm: serverTimestamp(),
      status: "novo",
      impresso: false
    });

    return docRef.id;

  } catch (erro) {
    console.error("Erro ao salvar pedido:", erro);
    throw erro;
  }
}