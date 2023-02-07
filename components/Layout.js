import { Header } from "./Header";

export const Layout = ({
  navigation,
  settings,
  withHeaderDivider,
  pagination,
  children,
}) => {
  return (
    <div className="text-slate-700 bg-bgYellow">
      <Header
        withProfile={false}
        withDivider={withHeaderDivider}
        navigation={navigation}
        settings={settings}
        pagination={pagination}
      />
      <main>{children}</main>
    </div>
  );
};
