class StatusBasico {

  constructor(nome, status) {
    this._nome = nome;
    this._status = status;
  }

  get nome(){
    return this._nome;
  }

  get status(){
    return this._status;
  }
}
