console.log("Programa ejecutándose correctamente");
console.log(process.argv);
const args = process.argv.slice(2);

async function obternerDatos(id){
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.log("Error al obtener los datos: ", error);
    }
}

async function crearProducto(producto){
    try {
        const response = await fetch(`https://fakestoreapi.com/products`, {
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json();
            console.log("Producto creado correctamente: " , data.id);
        }

    }catch(error){
        console.log("Error al crear el producto: ", error);
    }
}



async function eliminarProducto (producto){
     try {
        const response = await fetch(`https://fakestoreapi.com/products/${producto}`, {
            method: 'DELETE',
           
        });
        const data = await response.json();
        return data;
    }catch(error){
        console.log("Error al obtener los datos: ", error);
    }
}




switch(args[0]){
    case "GET":
        console.log(args[0] );
        console.log("peticion de datos");
                
        if (args[1] && args[1].startsWith("productos")) {
            const productos = await obternerDatos(args[1]);
            console.log("peticion de productos concretada");
            console.log(productos);
        }else{
            console.log("peticion de productos no concretada");
            
        }

        break;
    case "POST":
        console.log(args[0]);
        console.log("peticion de datos");
        if (args[1] && args[2] && args[3] && args[4] && args[1].startsWith("productos")) {
            await crearProducto({
                                title: args[2],
                price: args[3],
                category: args[4],
            });
            console.log("Producto creado correctamente");

        }else{
            console.log("Comando incompleto. Debe incluir id, title , price y category.");
        }
        break;
    
    
    case "DELETE":
        console.log(args[0]);
        if(args[1].startsWith("productos/") && args[1].length > 9){
            const response = await eliminarProducto(args[1]);
            console.log("Producto eliminado correctamente: ", response);
        
        }else{
            console.log("Comando incompleto.");
        }
        break;
    default:
        console.log("Comando no reconocido. ");
    break;
}


