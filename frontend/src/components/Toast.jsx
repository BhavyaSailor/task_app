import { createContext, useCallback, useContext, useState } from "react";

const Ctx = createContext(() => {});
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const push = useCallback((text, type = "ok") => {
    const id = Date.now() + Math.random();
    setItems((a) => [...a, { id, text, type }]);
    setTimeout(() => setItems((a) => a.filter((x) => x.id !== id)), 4000);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {items.map((t) => <div key={t.id} className={`toast ${t.type}`}>{t.text}</div>)}
      </div>
    </Ctx.Provider>
  );
}
