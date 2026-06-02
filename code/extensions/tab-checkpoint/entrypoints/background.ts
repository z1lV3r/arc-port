import { createI18n } from "@wxt-dev/i18n";

export const i18n = createI18n();

export default defineBackground(async () => {
  console.log(i18n.t("helloWorld"));
});
