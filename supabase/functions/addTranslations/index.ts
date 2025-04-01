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

    // Add English translations as a batch
    const englishTranslations = [
      { language: 'en', key: 'nav.home', value: 'Home' },
      { language: 'en', key: 'nav.explore', value: 'Explore' },
      { language: 'en', key: 'nav.favorites', value: 'Favorites' },
      { language: 'en', key: 'nav.profile', value: 'Profile' },
      { language: 'en', key: 'nav.help', value: 'Help' },
      { language: 'en', key: 'nav.anywhere', value: 'Anywhere' },
      { language: 'en', key: 'nav.anyweek', value: 'Any week' },
      { language: 'en', key: 'nav.addguests', value: 'Add guests' },
      { language: 'en', key: 'nav.whereto', value: 'Where to?' },
      
      { language: 'en', key: 'hero.title', value: 'Discover extraordinary places to stay' },
      { language: 'en', key: 'hero.subtitle', value: 'Find unique homes and experiences around the world' },
      
      { language: 'en', key: 'featured.title', value: 'Featured places to stay' },
      { language: 'en', key: 'featured.subtitle', value: 'Explore our curated selection of amazing properties' },
      
      { language: 'en', key: 'search.where', value: 'Where' },
      { language: 'en', key: 'search.when', value: 'When' },
      { language: 'en', key: 'search.who', value: 'Who' },
      { language: 'en', key: 'search.destination', value: 'Destination, city, address' },
      { language: 'en', key: 'search.dates', value: 'Add dates' },
      { language: 'en', key: 'search.guests', value: 'Add guests' },
      { language: 'en', key: 'search.button', value: 'Search' },
      
      { language: 'en', key: 'footer.about', value: 'About' },
      { language: 'en', key: 'footer.community', value: 'Community' },
      { language: 'en', key: 'footer.host', value: 'Host' },
      { language: 'en', key: 'footer.support', value: 'Support' },
      { language: 'en', key: 'footer.description', value: 'Find extraordinary places to stay and unique experiences all around the world.' },
      { language: 'en', key: 'footer.rights', value: 'All rights reserved.' },
      { language: 'en', key: 'footer.privacy', value: 'Privacy' },
      { language: 'en', key: 'footer.terms', value: 'Terms' },
      { language: 'en', key: 'footer.sitemap', value: 'Sitemap' },
      { language: 'en', key: 'footer.howItWorks', value: 'How it works' },
      { language: 'en', key: 'footer.newsroom', value: 'Newsroom' },
      { language: 'en', key: 'footer.investors', value: 'Investors' },
      { language: 'en', key: 'footer.careers', value: 'Careers' },
      { language: 'en', key: 'footer.diversity', value: 'Diversity & Belonging' },
      { language: 'en', key: 'footer.accessibility', value: 'Accessibility' },
      { language: 'en', key: 'footer.referrals', value: 'Referrals' },
      { language: 'en', key: 'footer.giftCards', value: 'Gift cards' },
      { language: 'en', key: 'footer.hostHome', value: 'Host your home' },
      { language: 'en', key: 'footer.hostExperience', value: 'Host an experience' },
      { language: 'en', key: 'footer.responsibleHosting', value: 'Responsible hosting' },
      { language: 'en', key: 'footer.resourceCenter', value: 'Resource center' },
      { language: 'en', key: 'footer.communityForum', value: 'Community forum' },
      { language: 'en', key: 'footer.helpCenter', value: 'Help center' },
      { language: 'en', key: 'footer.trustSafety', value: 'Trust & Safety' },
      { language: 'en', key: 'footer.cancellationOptions', value: 'Cancellation options' },
      { language: 'en', key: 'footer.neighborhoodSupport', value: 'Neighborhood support' }
    ]

    // Add more Spanish translations
    const spanishTranslations = [
      { language: 'es', key: 'nav.home', value: 'Inicio' },
      { language: 'es', key: 'nav.explore', value: 'Explorar' },
      { language: 'es', key: 'nav.favorites', value: 'Favoritos' },
      { language: 'es', key: 'nav.profile', value: 'Perfil' },
      { language: 'es', key: 'nav.help', value: 'Ayuda' },
      { language: 'es', key: 'nav.anywhere', value: 'Cualquier lugar' },
      { language: 'es', key: 'nav.anyweek', value: 'Cualquier semana' },
      { language: 'es', key: 'nav.addguests', value: 'Agregar huéspedes' },
      { language: 'es', key: 'nav.whereto', value: '¿A dónde vas?' },
      
      { language: 'es', key: 'hero.title', value: 'Tu Hospedaje Ideal' },
      { language: 'es', key: 'hero.subtitle', value: 'Encuentra hogares y experiencias únicas en todo el mundo' },
      
      { language: 'es', key: 'featured.title', value: 'Lugares destacados para hospedarte' },
      { language: 'es', key: 'featured.subtitle', value: 'Explora nuestra selección de propiedades increíbles' },
      
      { language: 'es', key: 'search.where', value: 'Dónde' },
      { language: 'es', key: 'search.when', value: 'Cuándo' },
      { language: 'es', key: 'search.who', value: 'Quién' },
      { language: 'es', key: 'search.destination', value: 'Destino, ciudad, dirección' },
      { language: 'es', key: 'search.dates', value: 'Agregar fechas' },
      { language: 'es', key: 'search.guests', value: 'Agregar huéspedes' },
      { language: 'es', key: 'search.button', value: 'Buscar' },
      
      { language: 'es', key: 'auth.signIn', value: 'Inicio de Sesión' },
      { language: 'es', key: 'auth.signUp', value: 'Registrarse' },
      { language: 'es', key: 'auth.email', value: 'Correo electrónico' },
      { language: 'es', key: 'auth.password', value: 'Contraseña' },
      { language: 'es', key: 'auth.confirmPassword', value: 'Confirmar contraseña' },
      { language: 'es', key: 'auth.haveAccount', value: '¿Ya tienes una cuenta?' },
      { language: 'es', key: 'auth.noAccount', value: '¿No tienes una cuenta?' },
      { language: 'es', key: 'auth.admin', value: 'Administrador' },
      { language: 'es', key: 'auth.host', value: 'Anfitrión' },
      { language: 'es', key: 'auth.guest', value: 'Huésped' },
      { language: 'es', key: 'auth.dashboard', value: 'Panel de control' },
      { language: 'es', key: 'auth.profile', value: 'Mi perfil' },
      { language: 'es', key: 'auth.signOut', value: 'Cerrar sesión' },
      
      { language: 'es', key: 'footer.about', value: 'Acerca de' },
      { language: 'es', key: 'footer.community', value: 'Comunidad' },
      { language: 'es', key: 'footer.host', value: 'Anfitrión' },
      { language: 'es', key: 'footer.support', value: 'Soporte' },
      { language: 'es', key: 'footer.description', value: 'Encuentra lugares extraordinarios para hospedarte y experiencias únicas en todo el mundo.' },
      { language: 'es', key: 'footer.rights', value: 'Todos los derechos reservados.' },
      { language: 'es', key: 'footer.privacy', value: 'Privacidad' },
      { language: 'es', key: 'footer.terms', value: 'Términos' },
      { language: 'es', key: 'footer.sitemap', value: 'Mapa del sitio' },
      { language: 'es', key: 'footer.howItWorks', value: 'Cómo funciona' },
      { language: 'es', key: 'footer.newsroom', value: 'Sala de prensa' },
      { language: 'es', key: 'footer.investors', value: 'Inversionistas' },
      { language: 'es', key: 'footer.careers', value: 'Carreras' },
      { language: 'es', key: 'footer.diversity', value: 'Diversidad y pertenencia' },
      { language: 'es', key: 'footer.accessibility', value: 'Accesibilidad' },
      { language: 'es', key: 'footer.referrals', value: 'Referencias' },
      { language: 'es', key: 'footer.giftCards', value: 'Tarjetas de regalo' },
      { language: 'es', key: 'footer.hostHome', value: 'Sé anfitrión de tu casa' },
      { language: 'es', key: 'footer.hostExperience', value: 'Sé anfitrión de una experiencia' },
      { language: 'es', key: 'footer.responsibleHosting', value: 'Hospedaje responsable' },
      { language: 'es', key: 'footer.resourceCenter', value: 'Centro de recursos' },
      { language: 'es', key: 'footer.communityForum', value: 'Foro comunitario' },
      { language: 'es', key: 'footer.helpCenter', value: 'Centro de ayuda' },
      { language: 'es', key: 'footer.trustSafety', value: 'Confianza y seguridad' },
      { language: 'es', key: 'footer.cancellationOptions', value: 'Opciones de cancelación' },
      { language: 'es', key: 'footer.neighborhoodSupport', value: 'Soporte de vecindario' }
    ]

    // Insert English translations
    const { error: englishError } = await supabaseClient
      .from('translations')
      .upsert(englishTranslations, { onConflict: 'language,key' })

    if (englishError) {
      console.error('Error inserting English translations:', englishError)
      throw englishError
    }

    // Insert Spanish translations
    const { error: spanishError } = await supabaseClient
      .from('translations')
      .upsert(spanishTranslations, { onConflict: 'language,key' })

    if (spanishError) {
      console.error('Error inserting Spanish translations:', spanishError)
      throw spanishError
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Translations added successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in addTranslations function:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
