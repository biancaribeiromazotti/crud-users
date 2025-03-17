// Netflix & Spotify (Writable Stream)(Escrevendo ou enviando os dados aos poucos)

// Importação de clientes via CSV (Excel)
// 1gb -> 1.000.000 de linhas
// POST /upload import.csv

//SEM STREAM
// 10mb/s -- 100s
// 100s -> Inserções no banco de dados

//COM STREAM (Readable Stream) (Lendo os dados aos poucos)
// 1s -> 10mb -> 10.000 linhas
//1s -> Inserção de 10.000 linhas no banco de dados


//Readable Streams / Writable Streams


//stdin e stdout (é o que entra (stdin) no terminal e o que ele gera de resposta (stdout))

//Streams -> 

// process.stdin
//     .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStram extends Readable {

    index = 1

    _read(){
        const i = this.index++

        setTimeout(()=>{
            if(i>100){
                this.push(null)
            }else{
    
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        },1000)
        


    }
}

class InvertNumber extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk,encoding,callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

//new OneToHundredStram().pipe(process.stdout)
// new OneToHundredStram().pipe(new MultiplyByTenStream())
new OneToHundredStram().pipe(new InvertNumber()).pipe(new MultiplyByTenStream())