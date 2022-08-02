export function lfo(freq, func) {
    const period = 10
    let i = 0

    while(true){
      func(i)

      i = i +  127 / (( 1000 / freq ) / period)

      if(i > 127)
        i = 0

      await new Promise(r => setTimeout(r, period ));
    }

  }