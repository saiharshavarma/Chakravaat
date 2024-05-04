export default function CustomPrediction({ setText }) {
  return (
    <div className="flex h-full">
      <img
        src="/custom-prediction/upload-navbar.png"
        className="h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
        onMouseOver={() =>
          setText(
            "Use the navigation bar to move around to different pages and get help! We're currently on the custom prediction's page!"
          )
        }
        onMouseLeave={() => setText("Hover To Explore!")}
      />
      <img
        src="/custom-prediction/upload-sidebar.png"
        className="h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
        onMouseOver={() =>
          setText(
            "Over here you have a brief representation of the scale to classify cyclones! Below you get info about your current cyclone's category!"
          )
        }
        onMouseLeave={() => setText("Hover To Explore!")}
      />
      <div className="flex flex-col w-full">
        <img
          src="/custom-prediction/upload-midbar.png"
          className="w-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
          onMouseOver={() =>
            setText(
              "This is where your uploaded image can be previewed and used for prediction! Next to it, you get a checklist of instructions to easily predict for your own images!"
            )
          }
          onMouseLeave={() => setText("Hover To Explore!")}
        />
        <img
          src="/custom-prediction/upload-neutralbar.png"
          className="w-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
          onMouseOver={() =>
            setText(
              "This is where all the custom predictions are displayed! Click on them to change their units, get info about the custom category, and figure out how to handle natural disasters on spot!"
            )
          }
          onMouseLeave={() => setText("Hover To Explore!")}
        />
        <img
          src="/custom-prediction/upload-lowbar.png"
          className="w-full h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
          onMouseOver={() =>
            setText(
              "This is your quick access menu to select and upload images you want to predict for! Check in on the specifications and confirm your region coverage!"
            )
          }
          onMouseLeave={() => setText("Hover To Explore!")}
        />
      </div>
    </div>
  );
}
