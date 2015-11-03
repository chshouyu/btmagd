export const NAME = 'NAME';

export function setName(name) {
    return {
        type: NAME,
        name
    };
}