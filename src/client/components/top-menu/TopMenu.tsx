import { Icon } from '@iconify/react';
import { useState } from 'react';

import { brandName } from './constants/brand-name.constant';
import { MenuItem } from './menu-item/MenuItem';

export type MenuTextState = {
  text: string;
  isBrand: boolean;
};

export const TopMenu = () => {
  const [{ isBrand, text }, setMenuText] = useState<MenuTextState>({
    text: brandName,
    isBrand: true,
  });

  return (
    <div className="sticky top-0 z-[100] flex h-[60px] min-h-[60px] flex-col rounded-b-3xl bg-slate-500 p-1 px-7 opacity-40">
      <div className="flex h-full flex-col justify-between">
        <div
          className={`min-h-full select-none text-center text-lg ${
            isBrand ? 'text-sky-200 underline' : 'text-white'
          }`}
        >
          {text}
        </div>
        <div className="-m-4 flex flex-row self-center">
          <MenuItem
            Icon={<Icon icon="mynaui:image" className="h-12 w-12" />}
            text="Oeuvres Michel Bois"
            setMenuText={setMenuText}
          />
          <MenuItem
            Icon={<Icon icon="fa-solid:blog" className="h-12 w-12" />}
            text="Blog"
            setMenuText={setMenuText}
          />
          <MenuItem
            Icon={<Icon icon="mdi:ticket-user" className="h-12 w-12" />}
            text="Profil"
            setMenuText={setMenuText}
          />
        </div>
      </div>
    </div>
  );
};
