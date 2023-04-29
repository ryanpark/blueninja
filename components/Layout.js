import { Header } from "./Header";

export const Layout = ({
  navigation,
  settings,
  withHeaderDivider,
  pagination,
  children,
  pathname,
}) => {
  return (
    <div className="text-slate-700 bg-bgYellow">
      <Header
        withProfile={false}
        withDivider={withHeaderDivider}
        navigation={navigation}
        settings={settings}
        pagination={pagination}
        pathname={pathname}
      />
      <main>{children}</main>
    </div>
  );
};
