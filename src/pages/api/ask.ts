import { dev, type APIRoute } from "astro";
import { readFile } from 'node:fs/promises';
import { responseSSE } from '../../utils/sse';
import { Ollama, type ChatResponse } from 'ollama';

export const GET: APIRoute = async ({ request }) => {

    const url = new URL(request.url);
    const uuid = url.searchParams.get('uuid');
    const question = url.searchParams.get('question');

    if (!uuid) {
        return new Response('Buscando un uuid', {status: 400});
    }

    if (!question) {
        return new Response('Buscando una pregunta', {status: 400});
    }

    const chatContext = (await readFile(`public/text/${uuid}.txt`, 'utf-8')).replace('"', '\"');

    /* Configuration Chat Olllama
    let ollama = new Ollama({ host: "http://127.0.0.1:11434" });
    const message = { role: "user", content: `<context>${chatContext}</context><question>${question}</question>` };

    const response: ChatResponse = await ollama.chat({
        model: "chat-ollama",
        stream: false,
        messages: [message]
    });

     return new Response(JSON.stringify({
        response: response.message.content
    })) */

    return responseSSE({ request },async (sendEvent) => {

        let ollama = new Ollama({ host: "http://127.0.0.1:11434" });
        const message = { role: "user", content: `<context>${chatContext}</context><question>${question}</question>` };
       
        const response = await ollama.chat({
            model: "chat-ollama",
            stream: true,
            messages: [message]
        });

        for await (const part of response){
            sendEvent(part.message.content);
            // process.stdout.write(part.message.content);
        }

        sendEvent('___END___') 
    });
}  