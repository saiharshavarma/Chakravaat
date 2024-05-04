"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function UploadBar({
  setOriginalImage,
  setIntensity,
  setPressure,
  setCategory,
  setImagePreview,
}) {
  const [file, setFile] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpenDrawer) => () => {
    setOpenDrawer(newOpenDrawer);
  };

  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setImagePreview(event.target.files[0]);
  };

  const [region, setRegion] = useState({
    leftLon: "",
    topLat: "",
    rightLon: "",
    bottomLat: "",
  });

  const handleSubmit = async (event) => {
    toast.info("Your Image Has Been Submitted!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    event.preventDefault();

    if (!file) {
      toast.warn("Upload An Image!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      handleOpen();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_ADDRESS_URL}/image/prediction/`,
        {
          method: "POST",
          body: formData,
        }
      );
      handleClose();

      const data = await response.json();
      setOriginalImage(data.original_img);
      setIntensity(data.wind);
      setPressure(data.pressure);
      setCategory(data.category);
      setImagePreview("");
      toast.success("Image Uploaded!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      handleClose();
      toast.error("Image Couldn't Be Uploaded!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error("Error:", error);
    }
  };

  function isWithinRange(leftLon, topLat, rightLon, bottomLat) {
    function convertToDecimal(degrees, minutes, seconds, direction) {
      let decimal = degrees + minutes / 60 + seconds / 3600;
      if (direction === "S" || direction === "W") {
        decimal = -decimal;
      }
      return decimal;
    }

    const leftLonLimit = convertToDecimal(54, 0, 8.6, "E");
    const topLatLimit = convertToDecimal(29, 10, 9.2, "N");
    const rightLonLimit = convertToDecimal(97, 52, 50.2, "E");
    const bottomLatLimit = convertToDecimal(4, 28, 48.5, "S");

    const leftLonNum = parseFloat(leftLon);
    const topLatNum = parseFloat(topLat);
    const rightLonNum = parseFloat(rightLon);
    const bottomLatNum = parseFloat(bottomLat);

    if (
      leftLonNum >= leftLonLimit &&
      rightLonNum <= rightLonLimit &&
      topLatNum <= topLatLimit &&
      bottomLatNum >= bottomLatLimit
    ) {
      return true;
    } else {
      let outOfBoundsLimit = "";
      if (leftLonNum <= leftLonLimit) {
        outOfBoundsLimit = "Left Longitude";
      } else if (rightLonNum >= rightLonLimit) {
        outOfBoundsLimit = "Right Longitude";
      } else if (topLatNum >= topLatLimit) {
        outOfBoundsLimit = "Top Latitude";
      } else if (bottomLatNum <= bottomLatLimit) {
        outOfBoundsLimit = "Bottom Latitude";
      }

      return `${outOfBoundsLimit} is out of bounds.`;
    }
  }

  // console.log(isWithinRange('55°00\'08.6"E', '29°10\'09.2"N', '97°52\'50.2"E', '4°28\'48.5"S')); // true
  // console.log(isWithinRange('53°00\'08.6"E', '29°10\'09.2"N', '97°52\'50.2"E', '4°28\'48.5"S')); // "Left Longitude is out of bounds."

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 750,
    bgcolor: "background.paper",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: 24,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
  };

  return (
    <div className="w-full flex">
      <div className="flex items-center text-white rounded-lg w-full bg-white bg-opacity-10 py-2 px-3 mt-4 mr-4">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-row w-full">
            <label
              for="main-btn"
              className="text-sm p-2 text-center flex flex-col justify-center bg-white bg-opacity-10 rounded-lg hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950 w-1/2 h-full mr-4"
            >
              SELECT IMAGE
              <input
                hidden
                type="file"
                id="main-btn"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            <button
              type="submit"
              className="text-sm p-2 border-0 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950 w-1/2"
            >
              UPLOAD
            </button>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </form>
      </div>
      <div className="flex items-center text-white rounded-lg w-[34rem] bg-white bg-opacity-10 px-3 py-2 mt-4">
        <button
          className="text-sm w-full h-10 border border-white rounded-lg mr-3 hover:bg-white hover:text-black border-opacity-20 hover:border-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950"
          onClick={handleOpenInfo}
        >
          CHECK REGION
        </button>
        <Tooltip title="Image Specifications">
          <button
            className="opacity-40 hover:opacity-100 transition ease-in-out delay-150"
            onClick={toggleDrawer(true)}
          >
            <InfoIcon sx={{ fontSize: 40 }} />
          </button>
        </Tooltip>
        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 500, height: "100vh", padding: "1rem" }}
            role="presentation"
            // onClick={toggleDrawer(false)}
          >
            <div className="h-full w-full flex flex-col">
              <div className="w-full rounded-lg p-2 bg-white bg-opacity-20 mb-3 text-center">
                IMAGE SPECIFICATIONS
              </div>
              <div className="w-full rounded-lg p-3 bg-white bg-opacity-5">
                <ul>
                  <li className="w-full p-4 bg-white bg-opacity-10 rounded-lg mb-3">
                    <strong>Image File Type:</strong> JPEG, PNG, JPEG
                  </li>
                  <li className="w-full p-4 bg-white bg-opacity-10 rounded-lg mb-3">
                    <strong>Image Type:</strong> Satellite
                  </li>
                  <li className="w-full p-4 bg-white bg-opacity-10 rounded-lg mb-3">
                    <strong>Region:</strong> Indian Ocean
                  </li>
                  <li className="w-full p-3 bg-white bg-opacity-10 rounded-lg mb-3">
                    <strong>Pixel Crop Coordinates:</strong>
                    <ul className="list-disc ml-6 mt-2">
                      <li className="w-full p-2 bg-white bg-opacity-10 rounded-lg mb-2 px-4">
                        <strong>Left:</strong> 200 pixels
                      </li>
                      <li className="w-full p-2 bg-white bg-opacity-10 rounded-lg mb-2 px-4">
                        <strong>Top:</strong> 500 pixels
                      </li>
                      <li className="w-full p-2 bg-white bg-opacity-10 rounded-lg mb-2 px-4">
                        <strong>Right:</strong> 1060 pixels
                      </li>
                      <li className="w-full p-2 bg-white bg-opacity-10 rounded-lg px-4">
                        <strong>Bottom:</strong> 1280 pixels
                      </li>
                    </ul>
                  </li>
                  <li className="w-full p-3 bg-white bg-opacity-10 rounded-lg">
                    <strong>Map Coordinates (Estimated):</strong>
                    <ul className="list-disc ml-6 mt-2">
                      <li className="w-full p-2 bg-white bg-opacity-10 rounded-lg mb-2 px-4">
                        <strong>Left Longitude:</strong> 54°00'08.6"E
                      </li>
                      <li className="w-full p-2 bg-white bg-opacity-10 rounded-lg mb-2 px-4">
                        <strong>Top Latitude:</strong> 29°10'09.2"N
                      </li>
                      <li className="w-full p-2 bg-white bg-opacity-10 rounded-lg mb-2 px-4">
                        <strong>Right Longitude:</strong> 97°52'50.2"E
                      </li>
                      <li className="w-full p-2 bg-white bg-opacity-10 rounded-lg px-4">
                        <strong>Bottom Latitude:</strong> 4°28'48.5"S
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              {/* <HelperDrawerContent /> */}
            </div>
          </Box>
        </Drawer>
        <Modal
          open={openInfo}
          onClose={handleCloseInfo}
          aria-labelledby="unit-conversion-settings"
          aria-describedby="unit-conversion-for-predicted-categories"
        >
          <Box sx={style}>
            <div className="flex flex-col p-4 w-full h-full">
              <TextField
                id="outlined-basic"
                label="Left Longitude"
                variant="filled"
                className="rounded-lg mb-4"
                type="text"
                onChange={(event) =>
                  setRegion((prevRegion) => {
                    const newRegion = {
                      ...prevRegion,
                      leftLon: event.target.value,
                    };
                    return newRegion;
                  })
                }
              />
              <TextField
                id="outlined-basic"
                label="Top Latitude"
                variant="filled"
                className="rounded-lg mb-4 w-full"
                type="text"
                onChange={(event) =>
                  setRegion((prevRegion) => {
                    const newRegion = {
                      ...prevRegion,
                      topLat: event.target.value,
                    };
                    return newRegion;
                  })
                }
              />
              <TextField
                id="outlined-basic"
                label="Right Longitude"
                variant="filled"
                className="rounded-lg mb-4 w-full"
                type="text"
                onChange={(event) =>
                  setRegion((prevRegion) => {
                    const newRegion = {
                      ...prevRegion,
                      rightLon: event.target.value,
                    };
                    return newRegion;
                  })
                }
              />
              <TextField
                id="outlined-basic"
                label="Bottom Latitude"
                variant="filled"
                className="rounded-lg mb-4 w-full"
                type="text"
                onChange={(event) =>
                  setRegion((prevRegion) => {
                    const newRegion = {
                      ...prevRegion,
                      bottomLat: event.target.value,
                    };
                    return newRegion;
                  })
                }
              />
              <button
                className="w-full p-2 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 transition ease-in-out delay-150"
                onClick={() => {
                  const response = isWithinRange(
                    region.leftLon,
                    region.topLat,
                    region.rightLon,
                    region.bottomLat
                  );
                  if (response === true) {
                    toast.success("Your Image Is Within Range", {
                      position: "top-center",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  } else {
                    toast.error(response, {
                      position: "top-center",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }
                }}
              >
                SUBMIT
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
