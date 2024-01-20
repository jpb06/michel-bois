import { Link } from '@remix-run/react';
import { useState } from 'react';

import { useOptionalUser } from '@client/hooks';

import { brandName } from './constants/brand-name.constant';
import { MenuItem } from './menu-item/MenuItem';
import { PageTitle } from './page-title/PageTitle';

export type MenuTextState = {
  text: string;
  isBrand: boolean;
};

export const TopMenu = () => {
  const user = useOptionalUser();

  const [{ isBrand, text }, setMenuText] = useState<MenuTextState>({
    text: brandName,
    isBrand: true,
  });

  return (
    <div>
      <PageTitle />
      <div className="sticky top-0 z-[100] flex h-[60px] min-h-[60px] flex-col rounded-b-3xl bg-gradient-to-b from-sky-800 to-cyan-700 p-1 px-7 opacity-90">
        <div className="flex h-full flex-col justify-between">
          <div
            className={`min-h-full select-none text-center text-lg ${
              isBrand ? 'text-sky-200 underline' : 'text-white'
            }`}
          >
            {text === brandName ? <Link to="/">{text}</Link> : text}
          </div>
          <div className="-m-4 flex flex-row self-center">
            <MenuItem
              icon="mynaui:image"
              text="Oeuvres Michel Bois"
              setMenuText={setMenuText}
              to="/documents"
            />
            <MenuItem
              icon="fa-solid:blog"
              text="Blog"
              setMenuText={setMenuText}
              to="/blog"
            />
            {user ? (
              <MenuItem
                icon="mdi:ticket-user"
                text="Profil"
                setMenuText={setMenuText}
                to="/profile"
              />
            ) : (
              <MenuItem
                icon="majesticons:login"
                text="Login / Signup"
                setMenuText={setMenuText}
                to="/login"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
