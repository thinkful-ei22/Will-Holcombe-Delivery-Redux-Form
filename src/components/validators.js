export const required = value => ( value ? undefined : 'Required');
export const nonEmpty = value => 
        value.trim() !== '' ? undefined : 'Must not be empty';
export const fiveChar = value => 
        value.length === 5 ? undefined : 'Must be exactly 5 digits';
export const numbersOnly = value => 
        /^\d+$/.test(value) ? undefined : 'Must contain numbers only';