import { motion, AnimatePresence } from "framer-motion";

const MiniChatbot = ({ visible }) => {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: "linear" }}
          className="rounded-lg absolute z-[1500] right-0 bottom-0 bg-white overflow-hidden"
          onClick={(event) => event.stopPropagation()}
        >
          <iframe
            allow="microphone;"
            width="350"
            height="430"
            src="https://console.dialogflow.com/api-client/demo/embedded/10ee9a26-f24f-4fdd-ae6d-f4bd59622f41"
          ></iframe>
        </motion.div>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

export default MiniChatbot;
