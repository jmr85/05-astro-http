import type  { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

//esta ruta no se genera estaticamente
//preciso que sea generada cuando se haga una solicitud
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const posts = await getCollection('blog');

    const url = new URL(request.url);
    const slug = url.searchParams.get('slug') || '';

    console.log( 'slug ------->>>>>> ', slug);

    if (!slug === null || slug !== '') {
        const post = await getEntry('blog', slug);
        return new Response(JSON.stringify(post), { 
            status: 200,
            headers: { 
                'Content-Type': 'application/json' 
            } 
        });
    }    
    return new Response(JSON.stringify(posts), { 
        status: 200,
        headers: { 
            'Content-Type': 'application/json' 
        } 
    });
};