import { createContext, useContext, useReducer } from "react";

// Membuat context untuk menyimpan state bahasa
export const LanguageContext = createContext();

// State awal untuk bahasa
const initialState = {
  language: "english", // Bahasa Inggris sebagai default
};

// Reducer untuk mengubah state bahasa
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_LANGUAGE":
      return {
        ...state,
        language: state.language === "english" ? "indonesian" : "english",
      };
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

// Komponen provider untuk menyediakan state bahasa ke komponen-komponen dalam aplikasi
export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LanguageContext.Provider value={{ state, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook untuk menggunakan state dan dispatch bahasa
export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};
