// criando as Classes Hotel e Reserva:
class Hotel {
  Id
  Nome
  Categoria
  Endereco
  Telefone

  constructor(id, nome, categoria, endereco, telefone) {
    this.Id = id
    this.Nome = nome
    this.Categoria = categoria
    this.Endereco = endereco
    this.Telefone = telefone 
  }
}

class Reserva {
  Id
  IdHotel
  Nome
  DiaEntrada
  DiaSaida

  constructor(id, idHotel, nome, diaEntrada, diaSaida) {
    this.Id = id
    this.IdHotel = idHotel
    this.Nome = nome
    this.DiaEntrada = diaEntrada
    this.DiaSaida = diaSaida
  }
}

// Declarar Variáveis globais:

let hoteis = [];  // Arrays para guardar hotéis e reservas:
let reservas = [];

let idHotel = 1; // Iniciar variáveis Ids.
let idReserva = 1;



// Declaração de Funções:
function cadastrarHotel() { // Agora, eu vou criar uma função para cadastrar um novo hotel.
  let nome = prompt("Digite o nome do hotel:"); // A função vai receber todas as informações necessárias para um hotel.
  let categoria = parseInt(prompt("Digite a categoria do hotel:"));
  let endereco = prompt("Digite o endereço do hotel:");
  let telefone = prompt("Digite o telefone do hotel:");
  let hotel = new Hotel(idHotel, nome, categoria, endereco, telefone);
  idHotel++;
  hoteis.push(hotel);
  console.log("Hotel cadastrado com sucesso!");
}

function cadastrarReserva() { // Similarmente, eu crio uma função para cadastrar uma nova reserva.
  let idHotelReserva;
  let encontrado = false;
  do {
    idHotelReserva = parseInt(prompt("Digite o Id do hotel da reserva:"));
    if (hoteis.some(h => h.Id === idHotelReserva)) { // Verifico se o ID da reserva já existe. 
      console.log("Hotel encontrado.");
      encontrado = true; // o Id é salvo na variável.
    } else {
      console.log("Id do hotel não encontrado");
    }
  } while (!encontrado)

  let nome = prompt("Digite o nome do responsável pela reserva:");
  let diaEntrada = parseInt(prompt("Digite o dia de entrada:"));
  let diaSaida
  do {
    diaSaida = parseInt(prompt("Digite o dia de saída:"));
    if (diaSaida < diaEntrada) {
      console.log("Dia de saída inválido. O dia de saída precisa ser maior que o dia de entrada");
    }
  } while (diaSaida < diaEntrada)

  let reserva = new Reserva(idReserva, idHotelReserva, nome, diaEntrada, diaSaida)
  idReserva++;
  reservas.push(reserva);
}

function exibirReservasHotelPeloIdHotel(idHotel) {
  let hotel = hoteis.find(h => h.Id === idHotel); //O código então procura no array hoteis 
  if (!hotel) {                                   // o objeto Hotel que tem esse Id e salva na variável hotel.
    console.log("Id do hotel não encontrada.");   //Neste caso, hotel será o objeto correspondete
    return;                                       // ao id de idHotel, pesquisado no array hoteis.
  } else {
    for (let r of reservas) {
      if (r.IdHotel === idHotel) {
        console.log(`Nome do hotel: ${hotel.Nome}\n Nome do responsável pela reserva: ${r.Nome}\n Dia de entrada: ${r.DiaEntrada}\n Dia de saída: ${r.DiaSaida}`);
      }                           //Agora, hotel.Nome será aquele que 
    }                             // estamos acessando na propriedade Nome do objeto hotel.
  }                                                        
}



function exibirDadosDeUmaReservaPeloId(idReserva) {
  let reserva = reservas.find(r => r.Id === idReserva); //Busco no array reservas o Objeto Reserva correspondente ao ao Id de
  if (!reserva) {                                       // idReserva. Esse Objeto é salvo na variavel reserva, e portanto tem
    console.log("Id de reserva não encontrada.");             // todas as suas propriedades: .Id, .IdHotel, .Nome, .diaEntrada, .diaSaida.
    return;                                                
  }
  let hotel = hoteis.find(h => h.Id === reserva.IdHotel);   //Busco na array hoteis, o hotel de id correspondente a 
  console.log(`Nome do hotel: ${hotel.Nome}\n Nome do responsável pela reserva: ${reserva.Nome}\n Dia de entrada: ${reserva.DiaEntrada}\n Dia de saída: ${reserva.DiaSaida}`);
}                                                       
                                                        
function exibirReservasPeloNomeResponsavel(nome) {
  let encontrado = false;
  for (let r of reservas) {
    if (r.Nome === nome) {                             //Para todo r.Nome de reservas que corresponder ao nome buscado
      let hotel = hoteis.find(h => h.Id === r.IdHotel) // o Objeto correspondente, em hoteis, vai ser salvo na variável hotel.
      console.log(`Id da reserva: ${r.Id}\n Nome do hotel: ${hotel.Nome}`);
      encontrado = true; //Sem isso, "encontrado" permanecerá false durante toda a execução da função
    }                    // ainda imprimirá as informações das reservas correspondentes,
  }                      // mas também imprimirá erroneamente a mensagem "Não existem reservas nesse nome".
  if (!encontrado) { //Se encontrado ainda é false, uma mensagem é exibida para informar 
    console.log("Não existem reservas nesse nome"); //que nenhuma reserva foi encontrada para o nome fornecido.
  }
}


function exibirArrayHoteisDaCategoria(categoria) {
  let hoteisDaCategoria = []; // Declara um array vazio pra receber os hoteis da categoria buscada.
  categoria = parseInt(categoria) // Converte categoria para um numero inteiro.
  if (hoteis.some(h => h.Categoria === categoria)) { // antes de entrar no Loop, verifica se existe um hotel nessa categoria.
    for (let h of hoteis) {            //O loop for...of vai percorrer cada Objeto do array "hoteis". 
      if (h.Categoria === categoria) { // Cada elemento "h" (Objeto) será um hotel individual que eu posso examinar mais de perto.
        hoteisDaCategoria.push(h.Nome); // Adiciona o Nome de cada Hotel encontrado da categoria passada pela função.
      }
    }
  return hoteisDaCategoria;
  } else {
      return "Não existe hotel cadastrado dessa categoria"; // se não achar hoteis nessa categoria, ela avisa.
    }
}

function atualizarTelefonePeloId(idHotel, telefone) {
  for (let h of hoteis) {  //Este loop percorre cada objeto h na lista hoteis. Cada objeto h representa um hotel.
    if (h.Id === idHotel) {  //No loop, verifica se o Id do hotel atual (h.Id) corresponde ao idHotel passado pela função.
      h.Telefone = telefone; //Caso encontre o hotel, atualiza o telefone desse Objeto Hotel.
      console.log("Telefone atualizado");
      return; // O return é usado para encerrar a função assim que o hotel é encontrado e o telefone atualizado, 
    }         // economizando tempo e evitando confusão ao usuário. economizando tempo e evitando confusão ao usuário.
  }
  // Se chegou até aqui, o hotel não foi encontrado
  console.log("Id do hotel não encontrado");
}

//Programa principal:
let continuar = true;

do {
  let  opcao = prompt("Escolha uma opcäo: \n1 - Cadastrar hotel \n2 - Cadastrar reserva" +
  "\n3 - Procurar reserva pelo Id do hotel \n4 - Exibir dados de reserva pelo Id \n5 - Procurar reserva pelo nome" +
  "\n6 - Procurar hotéis por categoria \n7 - Atualizar telefone de um hotel \n8 - Encerrar o programa");
  switch(opcao) {
      case "1":
          cadastrarHotel();
          break;

      case "2":
          cadastrarReserva();
          break;

      case "3":
          exibirReservasHotelPeloIdHotel(parseInt(prompt("Digite a Id das reservas que deseja exibir:")));
          break;

      case "4":
          exibirDadosDeUmaReservaPeloId(parseInt(prompt("Digite a Id da reserva que deseja exibir as informações:")));
          break;

      case "5":
          exibirReservasPeloNomeResponsavel(prompt("Digite o nome que deseja exibir as reservas:"));
          break;

      case "6":
          let hoteisDaCategoria = exibirArrayHoteisDaCategoria(prompt("digite a categoria que deseja exibir os hotéis:"));
          console.log(hoteisDaCategoria);
          break;
          
      case "7":
          let idHotel = parseInt(prompt("Digite a Id do hotel que deseja atualizar o telefone:"));
          let telefone = prompt("Digite o novo telefone do hotel:");
          atualizarTelefonePeloId(idHotel, telefone);
          break;
          
      case "8":
          console.log("Programa encerrado.");
          continuar = false;
          break;

      default:
          console.log("Opção inválida!");
          break;
  }
  
} while (continuar);