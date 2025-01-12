import {
  type Dispatch,
  type MutableRefObject,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useRef,
  useState
} from 'react'

type ProviderProps<T> = {
  defaultValue?: T
  children: ReactNode
}

export function createStateContext<T>(initialValue: T) {
  const Context = createContext<[T, Dispatch<SetStateAction<T>>] | null>(null)

  function StateContextProvider({defaultValue, children}: ProviderProps<T>) {
    const state = useState(defaultValue ?? initialValue)
    return <Context.Provider value={state}>{children}</Context.Provider>
  }

  function useStateContext() {
    const state = useContext(Context)

    if (state === null) {
      throw Error("Must be nest under it's context provider")
    }

    return state
  }

  return [useStateContext, StateContextProvider] as const
}

export function createRefContext<T>(initialValue: T) {
  const Context = createContext<MutableRefObject<T> | null>(null)

  function RefContextProvider({defaultValue, children}: ProviderProps<T>) {
    const ref = useRef(defaultValue ?? initialValue)
    return <Context.Provider value={ref}>{children}</Context.Provider>
  }

  function useRefContext() {
    const ref = useContext(Context)

    if (ref === null) {
      throw Error("Must be nest under it's context provider")
    }

    return ref
  }

  return [useRefContext, RefContextProvider] as const
}
