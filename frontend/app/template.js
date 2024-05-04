'use client'

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation";

export default function Template({
    children
}) {
    const key = usePathname();
    // const variants = {
    //     hidden: { opacity: 0, y: 100 },
    //     enter: { opacity: 1, y: 0 },
    //     exit: { opacity: 0,y: -100 },
    //   };
    const variants = {
        hidden: { opacity: 0},
        enter: { opacity: 1},
        exit: { opacity: 0},
      };
    return (
    //     <AnimatePresence mode="wait"
    //     // initial={false}
    // //   onExitComplete={() => window.scrollTo(0, 0)}
    //   >
    //         <motion.div
    //             key={key}
    //             initial="hidden"
    //             animate="enter"
    //             exit="exit"
    //             variants={variants}
    //             transition={{ type: 'linear', duration: 0.25 }}
    //             className="overflow-hidden"
    //         >
    //             {children}
    //         </motion.div>
    //     </AnimatePresence>
        <>
            {children}
        </>
    )
}


