import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "./Bounded";
import { Heading } from "./Heading";
import { HorizontalDivider } from "./HorizontalDivider";

const Profile = ({ name, description, profilePicture }) => {
  return (
    <div className="">
      <div className="flex max-w-lg gap-4 py-6">
        <PrismicLink href="/" tabIndex="-1">
          <div className="bg-slate-300 relative top-[6px] h-[30px] w-[30px] overflow-hidden">
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
              <Heading>
                <PrismicLink href="/">
                  <PrismicText field={name} />
                </PrismicLink>
              </Heading>
            )}
            {prismicH.isFilled.richText(description) && (
              <p className="text-slate-500 font-serif text-2xl italic leading-normal tracking-tight">
                <PrismicText field={description} /> here
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
    <li className="text-slate-800 font-semibold tracking-tight">{children}</li>
  );
};

export const Header = ({
  withDivider = true,
  withProfile = true,
  navigation,
  settings,
  pagination,
}) => {
  return (
    <Bounded as="header">
      <Profile
        name={settings.data.name}
        description={settings.data.description}
        profilePicture={settings.data.profilePicture}
      />
      <div className="grid grid-cols-1">
        <nav className="flex justify-between">
          {pagination}
          <ul className="flex flex-wrap justify-center gap-10">
            <NavItem>
              <PrismicLink href="/">
                <PrismicText field={navigation.data.homepageLabel} />
              </PrismicLink>
            </NavItem>
            {navigation.data?.links.map((item) => (
              <NavItem key={prismicH.asText(item.label)}>
                <PrismicLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicLink>
              </NavItem>
            ))}
          </ul>
        </nav>

        {withDivider && <HorizontalDivider />}
      </div>
    </Bounded>
  );
};
