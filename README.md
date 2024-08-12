# Comandos

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

# Notas sobre Cloudinary

Subir el pdf:

- Convertirlo en imágenes
- Redimenciona imagenes
- Optimiza formatos de imagenes segun Agent
- Extraer el texto
- TODO: agregar HATEOAS p 87 a el microservicio.

docker build -t fake-cloudinary:1.0 .

curl -X POST -F "file=@C:/Users/Luis/Desktop/Android_memory_forensics.pdf" http://localhost/pdf/upload

docker run -p 80:8080 -d fake-cloudinary:1.0

docker rm -fv hash

## Creación del modelo especifico    
ollama create pdf-chat -f Modelfile