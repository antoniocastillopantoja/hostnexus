
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Verificar si el usuario está autenticado
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'No autorizado' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    // Verificar si el usuario es administrador
    const { data: adminCheck, error: adminCheckError } = await supabaseClient
      .rpc('has_role', { _user_id: user.id, _role: 'admin' })

    if (adminCheckError || !adminCheck) {
      return new Response(
        JSON.stringify({ error: 'No autorizado - Se requiere rol de administrador' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      )
    }

    // Obtener datos de la solicitud
    const { userId, role, action } = await req.json()

    if (!userId || !role || !action) {
      return new Response(
        JSON.stringify({ error: 'Parámetros inválidos' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Verificar que el rol sea válido
    if (!['guest', 'host', 'admin'].includes(role)) {
      return new Response(
        JSON.stringify({ error: 'Rol inválido' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Realizar acción según lo solicitado
    let result

    if (action === 'add') {
      // Agregar rol
      const { data, error } = await supabaseClient
        .from('user_roles')
        .insert({
          user_id: userId,
          role,
        })
        .select()

      result = { data, error }
    } else if (action === 'remove') {
      // Eliminar rol
      const { data, error } = await supabaseClient
        .from('user_roles')
        .delete()
        .match({
          user_id: userId,
          role,
        })
        .select()

      result = { data, error }
    } else {
      return new Response(
        JSON.stringify({ error: 'Acción inválida' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    if (result.error) {
      return new Response(
        JSON.stringify({ error: result.error.message }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    return new Response(
      JSON.stringify({
        message: `Rol ${action === 'add' ? 'agregado' : 'eliminado'} correctamente`,
        data: result.data
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error en updateUserRole:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
