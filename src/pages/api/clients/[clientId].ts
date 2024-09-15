import type  { APIRoute } from 'astro';
import { db, Clients, eq } from 'astro:db';

//esta ruta no se genera estaticamente
//preciso que sea generada cuando se haga una solicitud
export const prerender = false;

//http://localhost:4321/api/clients/{clientId}
export const GET: APIRoute = async ({ params, request }) => {

    const { clientId } = params;
    console.log( 'clientId ------->>>>>> ', clientId);

    const body = {
        method: 'GET',
        clientId: clientId,
    }

    return new Response(JSON.stringify(body), { 
        status: 200,
        headers: { 
            'Content-Type': 'application/json' 
        } 
    });
};

//http://localhost:4321/api/clients/{clientId} (update valor particular)
export const PATCH: APIRoute = async ({ params, request }) => {
    const clientId = params.clientId ?? '';

    try {
      const { id, ...body } = await request.json();
  
      const results = await db
        .update(Clients)
        .set(body)
        .where(eq(Clients.id, +clientId));
  
      const updatedClient = await db
        .select()
        .from(Clients)
        .where(eq(Clients.id, +clientId));
  
      return new Response(JSON.stringify(updatedClient.at(0)), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
  
      return new Response(JSON.stringify({ msg: 'No body found' }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
};

// http://localhost:4321/api/clients/{clientId}
export const DELETE: APIRoute = async ({ params, request }) => {
    const clientId = params.clientId ?? '';

    const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, +clientId));
  
    if (rowsAffected > 0) {
      return new Response(JSON.stringify({ msg: 'Deleted' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  
    return new Response(
      JSON.stringify({ msg: `Client with id ${clientId} not found` }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
};

// export const getStaticPaths: GetStaticPaths = async () => {
//     return [
//         {
//             params: { slug: 'first-post' },
//         }
//     ];
// }