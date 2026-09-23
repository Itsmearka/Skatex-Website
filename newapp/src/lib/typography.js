export const normalizeUiText = (value) => String(value ?? '').replace(/\u2014/g, '-');
