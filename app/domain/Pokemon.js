const util = new Util(); 

class Pokemon {

    constructor() {
        this._id = 0;
        this._nome = "";
        this._tipo = "";
        this._img = "";
        this._altura = "";
        this._peso = "";
        this.idChain = 0;
        this._statusBasicos = [];
        this._jogos = [];
        this._movimentos = [];
        this._evolucoes = [];
      }
    
      get id() {
          return this._id;
      }
      set id(id){
          this._id = parseInt(id);
      }
    
      get nome() {
          return this._nome;
      }
      set nome(nome){
          this._nome = util.convertePrimeiraLetraMaiuscula(nome);
      }
    
      get tipo() {
          return this._tipo;
      }
      set tipo(tipo){
          this._tipo = util.convertePrimeiraLetraMaiuscula(tipo);
      }
    
      get img() {
          return this._img;
      }
      set img(img){
          this._img = img;
      }
    
      get img() {
          return this._img;
      }
      set img(img){
          this._img = img;
      }
    
      get altura() {
          return this._altura;
      }
      set altura(altura){
          if(altura > 0 && altura >= 100){
              if((altura % 100) == 0) {
                  this._altura = `${String((altura / 100)).replace('.',',')} m`;
              } else {
                  this._altura = `${String((altura / 100).toFixed(2)).replace('.',',')} m`;
              }
          } else {
              this._altura = `${String(altura)} cm`;
          }
      }
    
      get peso() {
          return this._peso;
      }
      set peso(peso){
          this._peso = peso;
      }
    
      get statusBasicos() {
          return this._statusBasicos;
      }
      set statusBasicos(data){
    
        let array = [];
    
        data.forEach(i => {
    
          let nome = i.stat && i.stat.name ? util.minimizaStringEspecial(i.stat.name) : null;
          let status = i.base_stat ? i.base_stat : null;
    
          if(nome, status){
            array.push(new StatusBasico(nome, status));
          }
    
        });
    
        this._statusBasicos = array;
      }
    
      get jogos() {
          return this._jogos;
      }
      set jogos(data){
    
        let array = [];
    
        for (let i = 0; i < data.length; i++) {
    
          let id = i + 1;
          let nome = data[i].version && data[i].version.name ? data[i].version.name : null;
    
          if(id && nome){
            array.push(new Jogo(id, nome));
          }
    
        }
    
        this._jogos = array;
      }
    
      get movimentos() {
          return this._movimentos;
      }
      set movimentos(data){
    
        let array = [];
    
        for (let i = 0; i < data.length; i++) {
    
          let id = i + 1;
          let nome = data[i].move && data[i].move.name ? data[i].move.name : null;
    
          if(id && nome){
            array.push(new Movimento(id, nome));
          }
    
        }
    
        this._movimentos = array;
      }
    
      get evolucoes() {
          return this._evolucoes;
      }
      set evolucoes(data){
    
        let array = [];
    
        for (let i = 0; i < data.length; i++) {
    
          let id = i + 1;
          let nome = data[i];
    
          if(id && nome){
            array.push(new Evolucao(id, nome));
          }
    
        }
    
        this._evolucoes = array;
    
      }
    
      serializador(id, data){
        
          this.id = id ? id : 0;
          this.nome = data.name ? data.name : "";
          this.tipo = data.types && data.types[0].type && data.types[0].type.name ? data.types[0].type.name : "";
          this.img = data.sprites.front_default ? data.sprites.front_default : 0;
          this.altura = data.height ? data.height * 10 : 0;
          this.peso = data.weight ? `${String((data.weight / 10).toFixed(1)).replace('.',',')} kg` :"0 kg";
          this.conteudo = data;
          this.statusBasicos = data.stats;
          this.jogos = data.game_indices;
          this.movimentos = data.moves;
    
          this.evolucoes = [];
      }
    
      limpeza(){
    
          this.id = 0;
          this.nome = "";
          this.tipo = "";
          this.img = "";
          this.altura = "";
          this.peso = "";
          this.idChain = 0;
          this.conteudo = [];
          this.statusBasicos = [];
          this.jogos = [];
          this.movimentos = [];
          this.evolucoes = [];
      }

}