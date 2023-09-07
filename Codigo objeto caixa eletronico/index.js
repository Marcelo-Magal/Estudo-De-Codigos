class transacao{
    valor
    tipoDeOperacao
    dataAtual

    constructor(valor, tipoDeOperacao){
        this.valor = valor
        this.tipoDeOperacao = Number(tipoDeOperacao)
        this.dataAtual = new Date()
    }

    buscarNomeDoTipoDeOperacao(){
       switch (this.tipoDeOperacao) {
        case 1:
            return "Depósito"
        case 2:
            return "Saque"
        default:
            return "Tipo de operacao inválida"
       } 
    }
}
class cliente{
    nome
    cpf
    saldo

    constructor(nome, cpf, saldoInicial){
        this.nome = nome
        this.cpf = cpf
        this.saldo = saldoInicial
    }

    sacar(valor){
        if(valor > this.saldo){
            console.log("Valor indisponivel no saldo do cliente");
            return false;
        }
        this.saldo -= valor;
        return true;
    }

    depositar(valor){
        if(valor < 0){
            console.log("Valor não pode ser negativo");
            return false;  
        }
        this.saldo += valor;
        return true;
    }
}
class caixaEletronico{
    transacoes
    valorDisponivel
    clientes
    #clienteLogado

    constructor(valorDisponivel, clientes){
        this.transacoes = [];
        this.valorDisponivel = valorDisponivel;
        this.clientes = clientes
    }


    sacar(valor){
        if(valor > this.valorDisponivel){
            console.log("Valor indisponivel no caixa eletrônico");
            return;
        }
        if(this.#clienteLogado.sacar(valor) == false){
            return;
        }

        this.valorDisponivel -= valor;
        this.transacoes.push(new transacao(valor, 2));
    }

    depositar(valor){
        if(valor < 0){
            console.log("Valor não pode ser negativo");
            return;  
        }
        if(this.#clienteLogado.depositar(valor) == false){
            return;
        }
        this.valorDisponivel += valor;
        this.transacoes.push(new transacao(valor, 1));
    }

    clienteExiste(cpf){
        return this.clientes.some(x => x.cpf == cpf)
    }

    logar(cpf){
        this.#clienteLogado = this.clientes.find(x => x.cpf == cpf)
    }
}

let continuar = true;
let clientes = [];

let meuCaixaEletronico = new caixaEletronico(10000, criarArrayDeClientesPadrao());

while(continuar){
    let cpfCliente = prompt('Insira o seu cpf')

    if(meuCaixaEletronico.clienteExiste(cpfCliente) == false){
        console.log('Cliente inserido nao encontrado')
        continue;
    }else{
        meuCaixaEletronico.logar(cpfCliente)
    }

    let valor = Number(prompt("Insira um valor"))
    let tipoDeOperacao = prompt("Insira uma operacao: 1 para depósito e 2 para saque")

    if(tipoDeOperacao == 1){
        meuCaixaEletronico.depositar(valor)
    }
    if(tipoDeOperacao == 2){
        meuCaixaEletronico.sacar(valor)
    }

    let desejaContinuar = prompt("Insira 1 para parar")
    if(desejaContinuar == 1){
        continuar = false;
    }
}


function criarArrayDeClientesPadrao(){
    return [new cliente('Giovanni', 1, 1000), new cliente('Luiz', 2, 2000), new cliente('Argollo', 3, 2000)]
}
