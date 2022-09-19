angular.module("pokedex").factory("pokedexAPI", function ($http) {

    var _getPokemon = function (id) {
        return $http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);        
    }

    var _getSpecie = function (id) {

        let species = [];

        let cache = localStorage.getItem("species");
                    
        if (cache) {
            species = JSON.parse(cache);
        }

        let specie = null;

        species.forEach(item => {
            if (item.id == id) {
                specie = item;
            }
        });
        
        if(specie) {

            return new Promise((resolve, reject) => {
                resolve(specie);
            });

        } else { 
            
            return new Promise((resolve, reject) => {
            
                $http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                    .then(res => { 
                        
                        let data = res.data;
    
                        if(!species.filter(item => item.id === data.id).length > 0) {
                            species.push(data);
                            species.sort(util.compare);
                            localStorage.setItem("species", JSON.stringify(species));
                        }   
    
                        resolve(data);
                        
                    })
                    .catch(err => {
                        reject(err);
                    });            
            });

        }
    }

    var _getEvolutionChain = function (id) {

        let chains = [];

        let cache = localStorage.getItem("chains");

        if (cache) {
            chains = JSON.parse(cache);
        }

        let chain = null;

        chains.forEach(item => {
            if (item.id == id) {
                chain = item;
            }
        });
        
        if(chain) {

            return new Promise((resolve, reject) => {
                resolve(chain);
            });

        } else { 

            return new Promise((resolve, reject) => {            

                $http.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
                    .then(res => { 
    
                        let data = res.data;
    
                        if(!chains.filter(item => item.id === data.id).length > 0) {
                            chains.push(data);
                            chains.sort(util.compare);
                            localStorage.setItem("chains", JSON.stringify(chains));
                        }   
    
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    });            
            });

        }        
    }

    return {
        getPokemon: _getPokemon,
        getSpecie: _getSpecie,
        getEvolutionChain: _getEvolutionChain
    }
});