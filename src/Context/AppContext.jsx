import { createContext } from 'react';
import { useFormState } from 'react-dom';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useFormState(localStorage.getItem('token'));

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
}
