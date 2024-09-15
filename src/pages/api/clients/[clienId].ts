import type  { APIRoute } from 'astro';

//esta ruta no se genera estaticamente
//preciso que sea generada cuando se haga una solicitud
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const { clientId } = params;
    console.log( 'clientId ------->>>>>> ', clientId);

    const body = {
        method: 'GET',
        clientId: clientId,
    }
    
    // if (!clientId) {
    //     return new Response(JSON.stringify({ msg: `'Client ${ clientId } not found'`}), { 
    //         status: 404,
    //         headers: { 
    //             'Content-Type': 'application/json' 
    //         } 
    //     });     
    // }
    return new Response(JSON.stringify(body), { 
        status: 200,
        headers: { 
            'Content-Type': 'application/json' 
        } 
    });
};

export const PATCH: APIRoute = async ({ params, request }) => {

    const { clientId } = params;
    console.log( 'clientId ------->>>>>> ', clientId);

    const body = {
        method: 'PATCH',
        clientId: clientId,
    }
    
    return new Response(JSON.stringify(body), { 
        status: 201,
        headers: { 
            'Content-Type': 'application/json' 
        } 
    });
};

export const DELETE: APIRoute = async ({ params, request }) => {

    const clientId  = params.clientId;
    console.log( 'clientId ------->>>>>> ', clientId);

    const body = {
        method: 'DELETE',
        clientId: clientId,
    }
    
    return new Response(JSON.stringify(body), { 
        status: 200,
        headers: { 
            'Content-Type': 'application/json' 
        } 
    });
};

export const POST: APIRoute = async ({ params, request }) => {

    const { clientId } = params;
    console.log( 'clientId ------->>>>>> ', clientId);

    const body = {
        method: 'POST',
        clientId: clientId,
    }
    
    return new Response(JSON.stringify(body), { 
        status: 201,
        headers: { 
            'Content-Type': 'application/json' 
        } 
    });
};

// export const getStaticPaths: GetStaticPaths = async () => {
//     return [
//         {
//             params: { slug: 'first-post' },
//         }
//     ];
// }