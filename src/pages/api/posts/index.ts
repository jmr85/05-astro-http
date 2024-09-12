import type  { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

//esta ruta no se genera estaticamente
//preciso que sea generada cuando se haga una solicitud
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const posts = await getCollection('blog');

    return new Response(JSON.stringify(posts), { 
        status: 200,
        headers: { 
            'Content-Type': 'application/json' 
        } 
    });
};