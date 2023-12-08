import dotenv from 'dotenv'

const isDev = process.env.NODE_ENV === 'development'
const PORT = 80
const envPath = isDev? '.env.development' : '.env'

dotenv.config({path:envPath})

Promise.all(
  [
    import('./mysql.js'),
    import('./redis.js'),
  ]
).then(()=>{
  startServer()
}).catch(e=>{
  console.log({e});
})


async function startServer(){
  const App = (await import('./app.js')).default
  App.listen(PORT,()=>{
    console.log(`App listening ${PORT}.`);
  })
}











