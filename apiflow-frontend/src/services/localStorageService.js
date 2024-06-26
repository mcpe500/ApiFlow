export const storeItem = (name, value) => {
  if (getItem(name)) {
    removeItem(name);
  }
  const data = JSON.stringify(value);
  localStorage.setItem(name, data);
};

export const getItem = (name) => {
  let item = localStorage.getItem(name);
  if (item == null) {
    return item;
  }
  const data = JSON.parse(item);
  return data;
};

export const removeItem = (value) => {
  localStorage.removeItem(value);
};
