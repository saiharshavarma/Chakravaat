export default function AIAnalysis({ setText }) {
  return (
    <div className="flex h-full">
      <img
        src="/ai-analysis/chatbot-navbar.png"
        className="h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
        onMouseOver={() =>
          setText(
            "Use the navigation bar to move around to different pages and get help! We're currently on the chatbot's page!"
          )
        }
        onMouseLeave={() => setText("Hover To Explore!")}
      />
      <img
        src="/ai-analysis/chatbot-sidebar.png"
        className="h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
        onMouseOver={() =>
          setText(
            "This is where all the questions you have regarding information on other pages is stored! With a click of a button you get these pre defined questions for you to ask right away!"
          )
        }
        onMouseLeave={() => setText("Hover To Explore!")}
      />
      <img
        src="/ai-analysis/chatbot-mainbar.png"
        className="h-full w-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
        onMouseOver={() =>
          setText(
            "Ask our chatbot to analysis anything! You can even export your current chats as a report, print it, copy it, and so much more!"
          )
        }
        onMouseLeave={() => setText("Hover To Explore!")}
      />
    </div>
  );
}
