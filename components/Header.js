import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "./Bounded";
import { Heading } from "./Heading";

const Profile = ({ name, description, profilePicture }) => {
  return (
    <div className="">
      <div className="flex max-w-lg gap-4 py-6">
        <PrismicLink href="/" tabIndex="-1">
          <div className="relative top-[6px] h-[30px] w-[30px] overflow-hidden bg-slate-300">
            {prismicH.isFilled.image(profilePicture) && (
              <PrismicNextImage
                field={profilePicture}
                fill={true}
                className="object-cover"
              />
            )}
          </div>
        </PrismicLink>
        {(prismicH.isFilled.richText(name) ||
          prismicH.isFilled.richText(description)) && (
          <div className="grid grid-cols-1 gap-2 text-center">
            {prismicH.isFilled.richText(name) && (
              <Heading size="3xl">
                <PrismicLink href="/">
                  <PrismicText field={name} />
                </PrismicLink>
              </Heading>
            )}
            {prismicH.isFilled.richText(description) && (
              <p className="font-serif text-2xl italic leading-normal tracking-tight text-slate-500">
                <PrismicText field={description} />
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ children }) => {
  return (
    <li className="font-semibold tracking-tight text-slate-800">{children}</li>
  );
};

export const Header = ({
  withDivider = true,
  withProfile = true,
  navigation,
  settings,
  pagination,
  pathname,
}) => {
  return (
    <Bounded as="header">
      <Profile
        name={settings.data.name}
        description={settings.data.description}
        profilePicture={settings.data.profilePicture}
      />
      <div className="grid grid-cols-1">
        <nav className="flex">
          {pagination}
          <ul className="mx-4 flex flex-wrap justify-end gap-2 sm:gap-2 md:gap-10 lg:gap-10">
            {!pathname?.includes("/articles/") &&
              navigation.data?.links.map((item) => (
                <NavItem key={prismicH.asText(item.label)}>
                  <PrismicLink
                    field={item.link}
                    className="hover:underlin hover:text-textBlue
"
                  >
                    <PrismicText field={item.label} />
                  </PrismicLink>
                </NavItem>
              ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
};
