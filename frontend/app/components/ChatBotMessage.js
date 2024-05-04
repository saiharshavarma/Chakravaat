import Image from "next/image";

const ChatBotMessage = ({ message }) => {
  return (
    <div className="flex flex-row my-2 mx-4 self-start">
      <Image
        src="/cyclone.jpg"
        width={500}
        height={500}
        alt="ChatBot Icon"
        className="w-10 h-10 rounded-md mr-2"
      />
      <div className="max-w-4xl break-words h-fit ml-2 bg-white bg-opacity-15 p-4 rounded-md">
        {message}
      </div>
    </div>
  );
};

export default ChatBotMessage;
