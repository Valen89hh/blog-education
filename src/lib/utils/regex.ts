export function isNumber(text: string){
    const regex = /^\d+$/;
    return regex.test(text);
}