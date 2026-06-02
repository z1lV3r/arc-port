import Demo from "@repo/shared/presentation/demo";
import "./App.css";
import { createI18n } from "@wxt-dev/i18n";

function App() {
  const i18n = createI18n();
  return <Demo t={i18n.t("helloWorld")} />;
}

export default App;
