class PontoDeColeta{
    constructor(endereco) {
        this.endereco = endereco;
    }
}

class Usuario{
    constructor(nome, cpf) {
        this.nome = nome;
        this.cpf = cpf;
        this.pontos = 0;
        this.pets = [];
    }
    getNome(){
        return this.nome;
    }
    getCpf(){
        return this.cpf;
    }
    addPonto(ponto){
        this.pontos += ponto;
    }
    get ponto(){
        return this.pontos;
    }
    addPet(nome,raca){
        const pet = new Pet(nome,raca);
        this.pets.push(pet);
    }
    getPets(){
        return this.pets;
    }
}

class Pet{
    constructor(nome,raca) {
        this.nome = nome;
        this.raca = raca;
    }
    getNome(){
        return this.nome;
    }
    getRaca(){
        return this.raca;
    }
}

function iniciar(){
    const inicio = document.getElementById('inicio');
    const menu = document.getElementById('menu');
    menu.classList.remove('hidden');
    inicio.classList.add('hidden');
}

function mostrarDiv(divId) {
    // Esconder todas as divs dentro do container
    const container = document.getElementById('container');
    const todasDivs = container.querySelectorAll('div');
    todasDivs.forEach(div => div.classList.add('hidden'));
    
    // Mostrar a div escolhida
    document.getElementById(divId).classList.remove('hidden');
}

const usuarios = [];
usuarios.push(new Usuario("Victor", 123), new Usuario("Maria", 456), new Usuario("Carlos",321));

usuarios.forEach((usuario,index) => {
    console.log(usuario.getNome(),index);
})
usuarios[0].addPet("bibi","gato");
usuarios[0].addPet("bibi2","gato");
console.log(usuarios[0].getPets());