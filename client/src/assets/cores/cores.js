export const numberToCost = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const textareaDataToArray = (data) => {
    if (!data) return []
    if (typeof data === 'array') return data;
    return data.split('\n').filter(value => value !== '');
}