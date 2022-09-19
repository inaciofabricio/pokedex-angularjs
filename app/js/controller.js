angular.module("pokedex").controller("pokedexCtrl", function ($scope, pokedexAPI) {
    
    $scope.pokemon = new Pokemon();
    $scope.painel = 0;

    var getPokemon = function (id) {

        $scope.pokemon.limpeza();

        let pokemons = [];

        let cache = localStorage.getItem("pokemons");
                    
        if (cache) {
            pokemons = JSON.parse(cache);
        }

        let pokemon = null;

        pokemons.forEach(item => {
            if (item.id == id) {
                pokemon = item;
            }
        });
        
        if(pokemon) {

            $scope.pokemon.serializador(id, pokemon);
            getSpecie();
            $scope.painel = 1;

        } else { 
        
            pokedexAPI.getPokemon(id)
                .then(res => { 

                    let data = res.data;

                    $scope.pokemon.serializador(id, data);
                    getSpecie();
                    $scope.painel = 1;

                    if(!pokemons.filter(item => item.id === data.id).length > 0) {
                        pokemons.push(data);
                        pokemons.sort(util.compare);
                        localStorage.setItem("pokemons", JSON.stringify(pokemons));
                    }   
                })
                .catch(function (error) {
                    console.log(error);
                    errorGetPokemon(id);
                });
        }
    }

    getPokemon(1);

    var errorGetPokemon = function (id) {
        $scope.pokemon.id = id;
        $scope.pokemon.img = "app/img/404.png";
        $scope.pokemon.altura = "...";
        $scope.pokemon.peso = "...";
    }

    function getSpecie() {

        pokedexAPI.getSpecie($scope.pokemon.id)
            .then(data => { 

                if(data){
                    var urls = data.evolution_chain.url.split('/');
                    urls = urls.filter(limpaStringVazia);
                    
                    $scope.pokemon.idChain = urls[urls.length-1] ? urls[urls.length-1] : 0;
                    getEvolutionChain();
                }
            })
            .catch(function (error, status) {
                console.log(error);
                console.log(status);
            });
    }

    var getEvolutionChain = function () {
        
        pokedexAPI.getEvolutionChain($scope.pokemon.idChain)
            .then(data => { 
                if(data) {
                    $scope.pokemon.evolucoes = [];
                    getEvolucoes(data.chain, []);
                }
            })
            .catch(function (error, status) {
                console.log(error);
                console.log(status);
            });
    }

    var getEvolucoes = function (obj, array) {
        if(obj != undefined) {
            let name = (obj.species.name.toLowerCase() == $scope.pokemon.nome.toLowerCase()) ? `(${convertePrimeiraLetraMaiuscula(obj.species.name)})` : obj.species.name;
            if(typeof name == "string"){
                array.push(name);
            }
            getEvolucoes(obj.evolves_to[0], array);
        } else {
            $scope.pokemon.evolucoes = array
        }         
    }

    var convertePrimeiraLetraMaiuscula = function(text) {
        return text.substring(0,1).toUpperCase() + text.substring(1);    
    }

    var limpaStringVazia = function (str) {
        return str.trim() != "";
    }


    $scope.anterior = function () {
        if(($scope.pokemon.id - 1) > 0){
            $scope.pokemon.id--;
            getPokemon($scope.pokemon.id);
        }
    }

    $scope.proximo = function () {
        $scope.pokemon.id++;
        getPokemon($scope.pokemon.id);
    }

    $scope.principal = function () { 
        $scope.painel = 1;
    }

    $scope.statusBasico = function () {
        $scope.painel = 2;
    }

    $scope.jogos = function () {
        $scope.painel = 3;
    }

    $scope.movimentos = function () {
        $scope.painel = 4;
    }

    $scope.evolucao = function () {
        $scope.painel = 5;
    }
});