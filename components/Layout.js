import { Header } from "./Header";

export const Layout = ({
  navigation,
  settings,
  withHeaderDivider,
  pagination,
  children,
  pathname,
  loading,
}) => {
  return (
    <div className="bg-bgYellow text-slate-900">
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
