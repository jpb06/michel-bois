import { Icon } from '@iconify/react';
import { useState } from 'react';

import { MenuItem } from './menu-item/MenuItem';

export const TopMenu = () => {
  const [menuText, setMenuText] = useState('');

  return (
    <div
      className={`z-[100] flex h-[60px] min-h-[60px] flex-col rounded-b-3xl bg-slate-500 p-2 px-7 opacity-30`}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className={`min-h-full text-center text-white`}>{menuText}</div>
        <div className="-m-4 flex flex-row self-center">
          <MenuItem
            Icon={<Icon icon="mdi:emoji-cat" className="h-12 w-12" />}
            text="Yolo"
            setMenuText={setMenuText}
          />
          <MenuItem
            Icon={<Icon icon="mdi:emoji-cat" className="h-12 w-12" />}
            text="Yolobr ocol"
            setMenuText={setMenuText}
          />
          <MenuItem
            Icon={<Icon icon="mdi:emoji-cat" className="h-12 w-12" />}
            text="super mag cool"
            setMenuText={setMenuText}
          />
          <MenuItem
            Icon={<Icon icon="mdi:emoji-cat" className="h-12 w-12" />}
            text="super mag cool"
            setMenuText={setMenuText}
          />
          <MenuItem
            Icon={<Icon icon="mdi:emoji-cat" className="h-12 w-12" />}
            text="super mag cool"
            setMenuText={setMenuText}
          />
        </div>
      </div>
    </div>
  );
};
