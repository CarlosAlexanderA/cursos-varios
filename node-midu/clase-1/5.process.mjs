// argumentos de entrada desde la consola
// console.log(process.argv);

// salir del proceso
// process.exit(0); // *<- todo a ido bien y que salga corectamente
// process.exit(1); // *<-a salido algo mal y debe salir

// podemos controlar los eventos del proceso
// process.on('exit', () => {
// //limpiar los recursos
// });

// current workin directory
// desde que carperta se ejcuta el proceso
console.log(process.cwd())

// variables de entorno
console.log(process.env.ALGO)
// ! --> ALGO=texto-desconzido node 5.proces,mjs
