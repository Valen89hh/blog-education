

export const getURL = (path: string = '') => {
    // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL &&
            process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
            ? process.env.NEXT_PUBLIC_SITE_URL
            : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
            process?.env?.NEXT_PUBLIC_VERCEL_URL &&
                process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
                ? process.env.NEXT_PUBLIC_VERCEL_URL
                : // If neither is set, default to localhost for local development.
                'http://localhost:3000/';

    // Trim the URL and remove trailing slash if exists.
    url = url.replace(/\/+$/, '');
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Ensure path starts without a slash to avoid double slashes in the final URL.
    path = path.replace(/^\/+/, '');

    // Concatenate the URL and the path.
    return path ? `${url}/${path}` : url;
};

export function calcularTiempoLectura(htmlContent: string): number {
    // Eliminar etiquetas HTML
    const plainText = htmlContent.replace(/<[^>]+>/g, "");
    
    // Contar las palabras en el texto
    const wordCount = plainText.trim().split(/\s+/).length;
    
    // Calcular el tiempo de lectura (200 palabras por minuto)
    const wordsPerMinute = 200;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    return readingTime; // Tiempo de lectura en minutos
}

export function getRangePage(page: number, itemsPerPage: number){
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    return{
        from, 
        to
    }
}

export function calculateMountPage(mount: number, total: number) {
    const add = (total % mount) !== 0 ? 1 : 0;
    return Math.floor(total / mount) + add;
}

// Función que divide el array en chunks
export const chunkArray = <T,>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
};