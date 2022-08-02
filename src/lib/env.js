export function env(trig, a, d, s, r, func) {
    const period = 10
    let i = 0
    let eq = (  ) 

    while(true){
      func(i)

      i = i + eq

      if(i > 127)
        i = 0

      await new Promise(r => setTimeout(r, period ));
    }

  }

  class Env {
    constructor(p){
      this.p = p || 10
      this.i = 0
      this.trig;
      this.a;
      this.d;
      this.s;
      this.r;
      this.i
    }

    listener(func){
      while(true){
        func(this.i)

        this.i = this.envGenerator()

        await new Promise(r => setTimeout(r, this.p ));
      }
    }

    envGenerator(){



    }

    set(e, value){
      this.[e] = value
    }

    trigger(){
      this.trig = true
      setTimeout( () => this.trig = false, this.p)
    }


  }

  module.exports.Env = new Env
  