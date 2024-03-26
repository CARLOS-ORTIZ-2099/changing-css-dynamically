//Including the required files




// creando servidor con node js
const http = require('http')
const fs = require('fs')
const { Server } = require('socket.io');


// manejando las peticiones con promesas

async function promise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err){
                reject('data not found')
            }else {
                resolve(data)
            }
        })
    })
}



const server = http.createServer( async (req, res) => {
    try {
        if(req.url === '/') {
           let data = await promise('./css-color.html')
           res.end(data)
        }
        else if(req.url === '/admin') {
           let data = await promise('./css-color-admin.html')
           res.end(data)
        }
    }
    catch(err) {
        res.end(err)
        
    }

})

server.listen(3000, () => console.log('server listening in port 3000'))

const io = new Server(server);

//Code for sockets

// estableciendo la conexion de los sockets, recibe como parametro la informacion de conexion de cada socket
io.on('connection', (socket) => {
  // definiendo el evento admin  
  socket.on('admin' , (data) => {
      console.log(data); 
      console.log('about to broadcast')
      // emitiendo el evento color para todos los sockets disponibles
      io.sockets.emit( 'color' , { data : data } )
    })
});



