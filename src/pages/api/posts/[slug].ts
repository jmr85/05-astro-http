import type  { APIRoute } from 'astro';
import { getEntry } from 'astro:content';


//esta ruta no se genera estaticamente
//preciso que sea generada cuando se haga una solicitud
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const { slug } = params;
    console.log( 'slug ------->>>>>> ', slug);
    
    const post = await getEntry('blog', slug as any);
    if (!post) {
        return new Response(JSON.stringify({ msg: `'Post ${ slug } not found'`}), { 
            status: 404,
            headers: { 
                'Content-Type': 'application/json' 
            } 
        });     
    }
    return new Response(JSON.stringify(post), { 
        status: 200,
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