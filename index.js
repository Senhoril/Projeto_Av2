class PontoDeColeta {
  constructor(endereco) {
    this.endereco = endereco;
  }
}

class Usuario {
  constructor(nome, cpf) {
    this.nome = nome;
    this.cpf = cpf;
    this.pontos = 0;
    this.pets = [];
  }
  getNome() {
    return this.nome;
  }
  getCpf() {
    return this.cpf;
  }
  addPonto(ponto) {
    this.pontos += ponto;
  }
  getPonto() {
    return this.pontos;
  }
  addPet(nome, especie) {
    const pet = new Pet(nome, especie);
    this.pets.push(pet);
  }
  getPets() {
    return this.pets;
  }
}

class Pet {
  constructor(nome, especie) {
    this.nome = nome;
    this.especie = especie;
  }
  getNome() {
    return this.nome;
  }
  getEspecie() {
    return this.especie;
  }
}

function menu() {
  const inicio = document.getElementById("inicio");
  const menu = document.getElementById("menu");
  menu.classList.remove("hidden");
  inicio.classList.add("hidden");
}

function mostrarDiv(divId) {
  // Esconder todas as divs dentro do container
  const container = document.getElementById("container");
  const todasDivs = container.querySelectorAll("div");
  todasDivs.forEach((div) => div.classList.add("hidden"));

  // Mostrar a div escolhida
  document.getElementById(divId).classList.remove("hidden");
}


function cadastrarUsuario() {
  const nome = document.getElementById("nome");
  const cpf = document.getElementById("cpf");
  if (nome.value === "" || cpf.value === "") {
    alert("Preencha todos os campos");
  } else {
    usuarios.push(new Usuario(nome.value, cpf.value));
    alert("Usuário cadastrado com sucesso✅");
    console.log(usuarios);
    nome.value = "";
    cpf.value = "";
  }
}
function selecionarUsuarios(id) {
  const selectUsuario = document.getElementById(id);
  selectUsuario.innerHTML = "";
  const defaultOption = document.createElement('option');
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "Escolha um usuário";
  selectUsuario.appendChild(defaultOption);
  usuarios.forEach((usuario) => {
    const option = document.createElement("option");
    option.value = usuario.getCpf(); // Ou um ID único se você tivesse um
    option.textContent =
     "CPF: "+ usuario.getCpf() + "  nome: " + usuario.getNome();
    selectUsuario.appendChild(option);
  });
}
function cadastrarPet() {
  const selectUsuario = document.getElementById('selectUsuarioPet');
  const nomePetInput = document.getElementById('nomePet');
  const especieInput = document.getElementById('raca'); // O ID continua 'raca' no HTML

  const cpfSelecionado = selectUsuario.value;
  const nomePet = nomePetInput.value;
  const especiePet = especieInput.value; // Mudança aqui
  const usuarioSelecionado = usuarios.find(usuario => usuario.getCpf() === cpfSelecionado);
  
  if (cpfSelecionado === "" || !nomePet || !especiePet) {
    alert("Por favor, preencha todos os campos");
  }
  else {
    usuarioSelecionado.addPet(nomePet, especiePet); // Mudança aqui
    alert(`Pet '${nomePet}' cadastrado para o usuário '${usuarioSelecionado.getNome()}'!`);
    console.log(usuarioSelecionado.getPets());
  }
    // Limpar os campos do formulário do pet
    nomePetInput.value = '';
    especieInput.value = '';
    selectUsuario.value = "";
}
function cadastrarPontoColeta(){
  const pontoColeta = document.getElementById('pontoDeColeta');
  const endereco = pontoColeta.value;
  if(endereco){
    pontosDeColeta.push(new PontoDeColeta(endereco));
    alert("Ponto de coleta cadastrado com sucesso")
    console.log(pontosDeColeta);
    pontoColeta.value = "";
  }
  else{
    alert("Por favor, preencha o endereço");
  }
}
function addPontos(){
    const pontosInput = document.getElementById('pontos');
    const selectUsuario = document.getElementById('selectUsuarioPontos');
    const cpfSelecionado = selectUsuario.value;
    const pontos = pontosInput.value;
    if (isNaN(pontos) || pontos === "" || cpfSelecionado === "" || pontos <= 0) {
      alert("Por favor, preencha todos os campos corretamente");
    }
    else {
      qtdPontos = parseInt(pontos);
      const usuarioSelecionado = usuarios.find(usuario => usuario.getCpf() === cpfSelecionado);
      usuarioSelecionado.addPonto(qtdPontos);
      console.log("Pontos: " + usuarioSelecionado.getPonto());
      alert("Pontos adicionados com sucesso")
    }
    pontosInput.value = "";
    selectUsuario.value = "";
}
function listarUsuarios_pets() {
  const usuariosEPets = document.getElementById("listarUsuarios-pets");
  usuariosEPets.innerHTML = "";
  
  for (const usuario of usuarios) {
    const nome = usuario.getNome();
    const nomeUsuario = document.createElement("h2");
    nomeUsuario.textContent = nome;
    usuariosEPets.appendChild(nomeUsuario);
    const pets = usuario.getPets();
    if (pets.length === 0) {
      const petCreate = document.createElement("h3");
      petCreate.textContent = "Sem pets cadastrados";
      usuariosEPets.appendChild(petCreate); 
    } else {
      for (const pet of pets) {
        console.log("Pet:", pet.getNome(), pet.getEspecie());
        const petCreate = document.createElement("h3");
        petCreate.textContent = pet.getNome() + " - " + pet.getEspecie();
        usuariosEPets.appendChild(petCreate);
      }
    }
  }
}
function listarPontuacao(){
  const pontuacao = document.getElementById("listaPontos");
  pontuacao.innerHTML = "";
  
  // Criar uma cópia do array de usuários e ordenar por pontos (decrescente)
  const usuariosOrdenados = [...usuarios].sort((a, b) => b.getPonto() - a.getPonto());
  
  for (const usuario of usuariosOrdenados) {
    const nome = usuario.getNome();
    const pontos = usuario.getPonto();
    const pontuacaoUsuario = document.createElement("li");
    pontuacaoUsuario.textContent = nome + " - " + pontos + " pontos";
    pontuacao.appendChild(pontuacaoUsuario);
  }
}
function listarPontosColeta(){
  const pontosColeta = document.getElementById("listarPontoColeta");
  pontosColeta.innerHTML = "";
  for (const ponto of pontosDeColeta) {
    const endereco = ponto.endereco;
    const pontosColetaUsuario = document.createElement("h2");
    pontosColetaUsuario.textContent = "📍 " + endereco;
    pontosColeta.appendChild(pontosColetaUsuario);
  }
}
const usuarios = [];
usuarios.push(
    new Usuario("Vladimir", "123213213"),
    new Usuario("Maria", "456"),
    new Usuario("Carlos", "321")
);
usuarios[0].addPet("Bolinha", "cachorro");
usuarios[1].addPet("Bilu", "gato");
usuarios[0].addPonto(300);
usuarios[1].addPonto(500);
usuarios[2].addPonto(200);
const pontosDeColeta = [new PontoDeColeta("Parque do Jaqueira"),
  new PontoDeColeta("Parque Dona lindu"), new PontoDeColeta("Parque do Castelo") ];