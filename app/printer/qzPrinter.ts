"use client";

import qz from "qz-tray";


export async function conectarImpressora() {

  if (!qz.websocket.isActive()) {
    await qz.websocket.connect();
  }

}


export async function imprimirPedido(pedido: any) {

  await conectarImpressora();


  const config = qz.configs.create(
    "NOME DA SUA IMPRESSORA"
  );


  const texto = `
SÁVEA DOCERIA
================

PEDIDO #${pedido.id}


CLIENTE:
${pedido.nome}


TELEFONE:
${pedido.telefone}


ITENS:
----------------
${pedido.produtos.map(
  (item: any) => `${item.quantidade}x ${item.nome}`
).join("\n")}


TOTAL:
R$ ${pedido.total}


PAGAMENTO:
${pedido.pagamento}


================
Obrigado!
`;


  const dados = [
    {
      type: "raw",
      format: "plain",
      data: texto
    }
  ];


  await qz.print(config, dados);

}