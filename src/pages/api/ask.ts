import { dev, type APIRoute } from "astro"
import { readFile } from 'node:fs/promises';
import { responseSSE } from '../../utils/sse'
import { Ollama } from 'ollama'

export const GET: APIRoute = async ({ request }) => {

    const url = new URL(request.url)
    const uuid = url.searchParams.get('uuid')
    const question = url.searchParams.get('question')

    if (!uuid) {
        return new Response('Buscando un uuid', {status: 400})
    }

    if (!question) {
        return new Response('Buscando una pregunta', {status: 400})
    }

    const chat_context = (await readFile(`public/text/${uuid}.txt`, 'utf-8')).replace('"', '\"')

    return responseSSE({ request },async (sendEvent) => {

        let ollama = new Ollama({ host: "192.168.1.222" })
        const message = { role: "user", content: `<context>${chat_context}</context><question>${question}</question>` }
       
        const response = await ollama.chat({
            model: "pdf-chat",
            stream: true,
            messages: [message]
        }).catch(console.error)

        for await (const part of response: ChatResponse){
            sendEvent(part.message.content)
        }
        sendEvent('___Response_End___') 
    })
}  