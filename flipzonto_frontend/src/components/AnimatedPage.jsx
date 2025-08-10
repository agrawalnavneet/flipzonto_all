// // components/AnimatedPage.jsx
// import { motion } from "framer-motion";

// const pageTransition = {
//   initial: { opacity: 0, x: 30 },
//   animate: { opacity: 1, x: 0 },
//   exit: { opacity: 0, x: -30 },
//   transition: { duration: 0.3 },
// };

// const AnimatedPage = ({ children }) => {
//   return (
//     <motion.div {...pageTransition}>
//       {children}
//     </motion.div>
//   );
// };

// export default AnimatedPage;









// components/AnimatedPage.jsx
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.25, // slightly longer for smoother effect
      ease: [0.25, 0.1, 0.25, 1], // smoother bezier curve
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
