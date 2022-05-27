export const storeDisplay = store => {
  return `${store.name} (${store.address}, ${store.city.name}, ${store.city.region.name})`;
};
