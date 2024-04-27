import { json } from "react-router-dom";

const storeItem = (name, value) => {
  if (getItem(name)) {
    removeItem(name);
  }
  const data = JSON.stringify(value);
  localStorage.setItem(name, data);
};

const getItem = (name) => {
  let item = localStorage.getItem(name);
  if (item == null) {
    return item;
  }
  const data = JSON.parse(item);
  return data;
};

const removeItem = (value) => {
  localStorage.removeItem(value);
};

export { storeItem, getItem, removeItem };
