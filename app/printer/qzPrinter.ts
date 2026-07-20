"use client";

import qz from "qz-tray";


export async function conectarImpressora() {

  if (!qz.websocket.isActive()) {
    await qz.websocket.connect();
  }

}


export async function imprimirPedido(pedido: any) {

  try {

    await conectarImpressora();


    const config = qz.configs.create(
      "NOME DA SUA IMPRESSORA"
    );


    const texto = `
SÁVEA DOCERIA
========================

PEDIDO: ${pedido.id}


CLIENTE:
${pedido.cliente.nome}


WHATSAPP:
${pedido.cliente.whatsapp}


ENTREGA:
${pedido.cliente.rua}, ${pedido.cliente.numero}
${pedido.cliente.bairro}
${pedido.cliente.cidade}

COMPLEMENTO:
${pedido.cliente.complemento}


------------------------
ITENS:

${pedido.itens}


------------------------

TOTAL:
R$ ${pedido.total.toFixed(2)}


PAGAMENTO:
${pedido.pagamento || "Não informado"}


OBS:
${pedido.cliente.observacoes || ""}


========================

Obrigado!
SÁVEA DOCERIA

`;


    const dados = [
      {
        type: "raw",
        format: "plain",
        data: texto
      }
    ];


    await qz.print(config, dados);


  } catch (erro) {

    console.error(
      "Erro ao imprimir pedido:",
      erro
    );

  }

}