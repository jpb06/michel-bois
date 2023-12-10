import { motion } from 'framer-motion';

type MenuItemProps = {
  Icon: JSX.Element;
  setMenuText: (text: string) => void;
  text: string;
};

export const MenuItem = ({ Icon, setMenuText, text }: MenuItemProps) => (
  <motion.div initial="rest" whileHover="hover" animate="rest">
    <motion.div
      transition={{
        duration: 0.3,
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      whileHover={{
        scale: 1.7,
        marginTop: '1.2rem',
        marginLeft: '0.6rem',
        marginRight: '0.6rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
      }}
      whileTap={{
        scale: 1.2,
        color: 'white',
      }}
      onHoverStart={() => setMenuText(text)}
      onHoverEnd={() => setMenuText('')}
      className="flex flex-col items-center"
    >
      <div className="mx-1 rounded-xl bg-teal-800 px-1">{Icon}</div>
    </motion.div>
  </motion.div>
);
