import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";
import { getDependencies } from "@/features/default-url/dependency-provider";

interface DefaultUrlContextType {
  defaultUrlUseCases: DefaultUrlUseCases;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const dependencies = getDependencies();

  const defaultUrlUseCases = useMemo(
    () => dependencies.get("defaultUrlUseCases"),
    [],
  );

  return (
    <DefaultUrlContext.Provider value={{ defaultUrlUseCases }}>
      {children}
    </DefaultUrlContext.Provider>
  );
}

const DefaultUrlContext = createContext<DefaultUrlContextType | undefined>(
  undefined,
);

export function useDefaultUrlContext() {
  const context = useContext(DefaultUrlContext);
  if (!context) {
    throw new Error(
      "useDefaultUrlContext must be used within a DefaultUrlContextProvider",
    );
  }
  return context;
}
