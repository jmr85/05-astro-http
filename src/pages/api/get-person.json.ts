import type  { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {

    const person = {
        name: 'John Doe',
        age: 42
    };

    return new Response(JSON.stringify(person), { 
        status: 201,
        headers: { 
            'Content-Type': 'application/json' 
        } 
    });
};