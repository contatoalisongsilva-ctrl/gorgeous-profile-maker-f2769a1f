import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    const {
      page_url,
      time_on_page_seconds,
      scroll_percentage,
      rage_clicks,
      journey_log,
      is_conversion,
      clarity_id
    } = body;

    // Log the received data for debugging
    console.log('CRO Data Received:', {
      page_url,
      time_on_page_seconds,
      scroll_percentage,
      rage_clicks,
      journey_log,
      is_conversion,
      clarity_id,
      timestamp: new Date().toISOString()
    });

    // Calculate engagement score
    const engagementScore = calculateEngagementScore({
      time_on_page_seconds,
      scroll_percentage,
      rage_clicks,
      is_conversion
    });

    // Generate insights based on the data
    const insights = generateInsights({
      time_on_page_seconds,
      scroll_percentage,
      rage_clicks,
      journey_log,
      is_conversion
    });

    return new Response(
      JSON.stringify({
        success: true,
        engagement_score: engagementScore,
        insights,
        received_at: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing CRO data:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

function calculateEngagementScore(data: {
  time_on_page_seconds: number;
  scroll_percentage: number;
  rage_clicks: number;
  is_conversion: boolean;
}): number {
  let score = 0;
  
  // Time on page (max 30 points)
  if (data.time_on_page_seconds > 180) score += 30;
  else if (data.time_on_page_seconds > 60) score += 20;
  else if (data.time_on_page_seconds > 30) score += 10;
  
  // Scroll percentage (max 30 points)
  score += Math.min(data.scroll_percentage * 0.3, 30);
  
  // Conversion bonus (40 points)
  if (data.is_conversion) score += 40;
  
  // Rage clicks penalty (-5 per rage click, max -20)
  score -= Math.min(data.rage_clicks * 5, 20);
  
  return Math.max(0, Math.min(100, Math.round(score)));
}

function generateInsights(data: {
  time_on_page_seconds: number;
  scroll_percentage: number;
  rage_clicks: number;
  journey_log: string[];
  is_conversion: boolean;
}): string[] {
  const insights: string[] = [];
  
  if (data.is_conversion) {
    insights.push('✅ Usuário converteu com sucesso');
  }
  
  if (data.time_on_page_seconds < 30) {
    insights.push('⚠️ Tempo na página muito baixo - considere melhorar o gancho inicial');
  }
  
  if (data.scroll_percentage < 50) {
    insights.push('⚠️ Usuário não rolou até metade da página - conteúdo acima da dobra precisa engajar mais');
  }
  
  if (data.rage_clicks > 2) {
    insights.push('🔴 Detectados cliques de frustração - verifique elementos não clicáveis que parecem botões');
  }
  
  if (data.journey_log.length > 10) {
    insights.push('📊 Alta interação detectada - usuário explorou múltiplas seções');
  }
  
  return insights;
}
