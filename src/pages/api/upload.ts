import { type APIRoute } from "astro";
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {

    // Get the file from the form
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    // Check if file is present
    if (file === null) {
        return new Response("No file found.",{status: 400});
    }

    // Request to provider
    const result = await fetch("http://localhost:8080/pdf/upload", { 
        method: 'POST',
        body: formData
    }).then( response => { return response.json() });

    const {uuid, originalName, totalPages, _links: { self: { href: self }, extractText: { href: extractText } }} = result;

    // Obtener el texto del pdf
    const pdf_text = await fetch(extractText).then(response => { return response.json() });

    // Tratamiento del texto 
    const outputDir = path.join(process.cwd(), 'public/text')
    const { text } = pdf_text
    fs.writeFile(`${outputDir}/${uuid}.txt`, text.trim(), 'utf-8')

    // Respuesta
    return new Response(JSON.stringify({
        uuid,
        originalName,
        totalPages,
        self
    }));
} 