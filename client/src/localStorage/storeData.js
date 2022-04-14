export const storeData = (key, value) => {
	return localStorage.setItem(key, JSON.stringify(value));
};
