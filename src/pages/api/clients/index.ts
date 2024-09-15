import type  { APIRoute } from 'astro';

//esta ruta no se genera estaticamente
//preciso que sea generada cuando se haga una solicitud
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const body = {
        method: 'GET'
    }

    return new Response(JSON.stringify(body), { 
        status: 200,
            headers: { 
            'Content-Type': 'application/json' 
        } 
    });
};

export const POST: APIRoute = async ({ params, request }) => {

    const body = {
        method: 'POST',
    }

    return new Response(JSON.stringify(body), { 
        status: 201,
            headers: { 
            'Content-Type': 'application/json' 
        } 
    });
};