import Cookies from "js-cookie";

// Check if we are in the browser
const isBrowser = typeof window !== "undefined";

export function saveData(key: string, value:any) {
  if (isBrowser) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      Cookies.set(key, value);
    }
  }
}

export function getData(key:string) {
  if (isBrowser) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return Cookies.get(key) || null;
    }
  }
  return null;
}

export function deleteData(key:string) {
  if (isBrowser) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      Cookies.remove(key);
    }
  }
}