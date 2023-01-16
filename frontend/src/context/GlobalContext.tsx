import { TodosGateway } from "@/gateway/TodosGateway";
import { createContext, PropsWithChildren, useContext } from "react";

interface GlobalContextProps {
  todosGateway: TodosGateway;
}

const GlobalContext = createContext({} as GlobalContextProps);

export function GlobalProvider({
  children,
  value,
}: PropsWithChildren<{ value: GlobalContextProps }>) {
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobal() {
  const context = useContext(GlobalContext);

  return context;
}
