import { type APIRoute } from "astro";
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file');

    if (file == null) {
        return new Response("No file found",{status: 400});
    }

    const result = await fetch("http://192.168.1.204/pdf/upload", { 
        method: 'POST',
        body: formData
    }).then( response => { return response.json() });


    const {uuid, origName, numPages} = result;

    // Obtener el texto del pdf
    const pdf_text = await fetch(`http://192.168.1.204/pdf/${uuid}/extract-text`)
        .then(response => { return response.json() })

    // Tratamiento del texto 
    const outputDir = path.join(process.cwd(), 'public/text')
    const { text } = pdf_text
    fs.writeFile(`${outputDir}/${uuid}.txt`, text.trim(), 'utf-8')

    return new Response(JSON.stringify({
        uuid,
        origName,
        numPages
    }));
} 