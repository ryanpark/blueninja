import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({
  navigation,
  settings,
  withHeaderDivider,
  withSignUpForm,
  children,
}) => {
  return (
    <div className="text-slate-700 bg-bgYellow">
      <Header
        withProfile={false}
        withDivider={withHeaderDivider}
        navigation={navigation}
        settings={settings}
      />
      <main>{children}</main>
    </div>
  );
};
