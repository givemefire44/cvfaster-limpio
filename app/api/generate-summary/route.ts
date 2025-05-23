
import { OpenAI } from 'openai';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Log: ¿La key está presente?
  console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'PRESENTE' : 'AUSENTE');

  const { jobTitle, jobDesc } = await req.json();
  console.log('jobTitle:', jobTitle);
  console.log('jobDesc:', jobDesc);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Eres un asistente que ayuda a crear resúmenes profesionales para CV. Tu respuesta debe ser SOLO el resumen, sin comillas ni aclaraciones.' },
        { role: 'user', content: `Escribe un resumen profesional para un CV basado en el título de trabajo "${jobTitle}" y la descripción si la hubiere sino crea una sobre los datos en formulario "${jobDesc}". Devuelve SOLO el resumen en una sola línea, sin agregar comillas ni ningún texto adicional. Máximo 250 caracteres.` },
      ],
      max_tokens: 200,
    });

    let summary = "";
    if (response && response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
      summary = response.choices[0].message.content.trim();
    } else {
      summary = "No se pudo generar un resumen. Por favor, intenta de nuevo.";
    }

    return NextResponse.json({ summary });

  } catch (error: any) {
    // Loguear el error real
    console.error('Error al generar el resumen:', error);
    // También podés loguear error.response para OpenAI
    if (error.response) {
      console.error('OpenAI response error:', await error.response.text?.());
    }
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
