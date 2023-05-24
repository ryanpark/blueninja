import { Header } from "./Header";
import { Loaders } from "./Loaders";

export const Layout = ({
  navigation,
  settings,
  withHeaderDivider,
  pagination,
  children,
  pathname,
  loading,
  isContactPage,
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
        isContactPage={isContactPage}
      />
      <main>{loading ? <Loaders /> : children}</main>
    </div>
  );
};
