////////////////////////////////////////////////////////////////////////
////////////////// FAÇA O SEU CÓDIGO AQUI \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////////////////////





class Aluno {
  Nome
  Idade
  Nota
  constructor(nome, idade, nota) {
    this.Nome = nome
    this.Idade = idade
    this.Nota = nota
  }
}

// Array

let arrayAlunos = [
  { Nome: "Alice", Nota: 70, Idade: 20 },
  { Nome: "Bob", Nota: 85, Idade:10 },
  { Nome: "Charlie", Nota: 30, Idade: 30 }
];

//funções projeto

function CadastrarAluno(nome, idade, nota, array) {
  const novoAluno = new Aluno(nome, idade, nota);
  if (!array.some(x => x.Nome == nome))
  array.push(novoAluno);
  return novoAluno;
}

function OrdenarPorNota(array) {
  array.sort((a, b) => a.Nota - b.Nota)
  return array;
}

function OrdenarPorIdade(array) {
  array.sort((a, b) => b.Idade - a.Idade)
  return array;
}

function OrdenarPorNome(array) {
  array.sort((a, b) => a.Nome.localeCompare(b.Nome));
  return array;
}

function CalcularMedia(array){
  let soma = 0;
  for (let i = 0; i < array.length; i++) {
    soma += array[i].Nota;
  }
  const media = soma / array.length;
  return media;
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function ExcluirAluno(array, nome) {
  let index
  let removido = false
  array.forEach(aluno => {
    if (aluno.Nome == nome) {
      index = array.indexOf(aluno)
      removido = true
    }
  })
  array.splice(index, 1)
  return removido
}

function PesquisarAluno(array, nome) {
  let pesquisa = false
  array.forEach(aluno => {
    if (aluno.Nome.includes(nome)) {
      pesquisa = true
    }
  })

  return pesquisa
}


// Test the functions
console.log(CadastrarAluno("David", 21, 90, arrayAlunos)); // Should add David
console.log(OrdenarPorNota(arrayAlunos));
console.log(OrdenarPorIdade(arrayAlunos));
console.log(OrdenarPorNome(arrayAlunos));
console.log(CalcularMedia(arrayAlunos));
console.log(ExcluirAluno(arrayAlunos, "Alice")); // Should remove Alice
console.log(PesquisarAluno(arrayAlunos, "Bob")); // Should find Bob