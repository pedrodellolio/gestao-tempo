import { useContext } from "react";
import PreferencesContext from "../context/preferences-context";

export function usePreferences() {
  return useContext(PreferencesContext);
}