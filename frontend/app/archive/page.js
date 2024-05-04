"use client";

import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import ArchivePredictionBar from "../components/ArchivePredictionBar";
import ArchivePictureBar from "../components/ArchivePictureBar";

import MiniChatbot from "../components/MiniChatbot";
import NoteTaker from "../components/NoteTaker";

import dayjs from "dayjs";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { IconButton } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dataArray = [
  {
    archive_data: {
      id: 1,
      wind: "10.502",
      pressure: "1001",
      name: "BUREVI",
      original_img:
        "media/archive/3DIMG_01JAN2019_0300_L1C_ASIA_MER_IR1_V01R00.jpg",
      category: 0,
      t_number: 1,
    },
    data_exists: false,
    next_wind_data: [
      12.174, 14.052, 15.55, 15.494, 14.654, 15.534, 14.288, 13.54,
    ],
    previous_wind_data: [
      9.265, 9.488, 9.107, 9.84, 10.476, 10.389, 10.317, 10.496,
    ],
    next_pressure_data: [1002, 1001, 999, 1000, 1001, 1001, 1002, 1000],
    previous_pressure_data: [1002, 1003, 1002, 1000, 999, 1000, 1000, 1001],
  },
  {
    archive_data: {
      id: 2,
      wind: "12.174",
      pressure: "1002",
      name: "BUREVI",
      original_img:
        "media/archive/3DIMG_01JAN2019_0600_L1C_ASIA_MER_IR1_V01R00.jpg",
      category: 0,
      t_number: 1,
    },
    data_exists: false,
    next_wind_data: [
      14.052, 15.55, 15.494, 14.654, 15.534, 14.288, 13.54, 12.22,
    ],
    previous_wind_data: [
      9.488, 9.107, 9.84, 10.476, 10.389, 10.317, 10.496, 10.502,
    ],
    next_pressure_data: [1001, 999, 1000, 1001, 1001, 1002, 1000, 1000],
    previous_pressure_data: [1003, 1002, 1000, 999, 1000, 1000, 1001, 1001],
  },
  {
    archive_data: {
      id: 3,
      wind: "14.052",
      pressure: "1001",
      name: "BUREVI",
      original_img:
        "media/archive/3DIMG_01JAN2019_1500_L1C_ASIA_MER_IR1_V01R00.jpg",
      category: 0,
      t_number: 1,
    },
    data_exists: false,
    next_wind_data: [
      15.55, 15.494, 14.654, 15.534, 14.288, 13.54, 12.22, 13.421,
    ],
    previous_wind_data: [
      9.107, 9.84, 10.476, 10.389, 10.317, 10.496, 10.502, 12.174,
    ],
    next_pressure_data: [999, 1000, 1001, 1001, 1002, 1000, 1000, 1002],
    previous_pressure_data: [1002, 1000, 999, 1000, 1000, 1001, 1001, 1002],
  },
  {
    archive_data: {
      id: 4,
      wind: "15.55",
      pressure: "999",
      name: "BUREVI",
      original_img:
        "media/archive/3DIMG_01JAN2019_1800_L1C_ASIA_MER_IR1_V01R00.jpg",
      category: 0,
      t_number: 1,
    },
    data_exists: false,
    next_wind_data: [
      15.494, 14.654, 15.534, 14.288, 13.54, 12.22, 13.421, 13.2981,
    ],
    previous_wind_data: [
      9.84, 10.476, 10.389, 10.317, 10.496, 10.502, 12.174, 14.052,
    ],
    next_pressure_data: [1000, 1001, 1001, 1002, 1000, 1000, 1002, 1001],
    previous_pressure_data: [1000, 999, 1000, 1000, 1001, 1001, 1002, 1001],
  },
  {
    archive_data: {
      id: 5,
      wind: "15.494",
      pressure: "1000",
      name: "BUREVI",
      original_img:
        "media/archive/3DIMG_01JAN2019_2100_L1C_ASIA_MER_IR1_V01R00.jpg",
      category: 0,
      t_number: 1,
    },
    data_exists: false,
    next_wind_data: [
      14.654, 15.534, 14.288, 13.54, 12.22, 13.421, 13.2981, 12.835,
    ],
    previous_wind_data: [
      10.476, 10.389, 10.317, 10.496, 10.502, 12.174, 14.052, 15.55,
    ],
    next_pressure_data: [1001, 1001, 1002, 1000, 1000, 1002, 1001, 1000],
    previous_pressure_data: [999, 1000, 1000, 1001, 1001, 1002, 1001, 999],
  },
  {
    archive_data: {
      id: 6,
      wind: "14.654",
      pressure: "1001",
      name: "BUREVI",
      original_img:
        "media/archive/3DIMG_03JAN2019_0000_L1C_ASIA_MER_IR1_V01R00.jpg",
      category: 0,
      t_number: 1,
    },
    data_exists: false,
    next_wind_data: [
      15.534, 14.288, 13.54, 12.22, 13.421, 13.2981, 12.835, 12.511,
    ],
    previous_wind_data: [
      10.389, 10.317, 10.496, 10.502, 12.174, 14.052, 15.55, 15.494,
    ],
    next_pressure_data: [1001, 1002, 1000, 1000, 1002, 1001, 1000, 999],
    previous_pressure_data: [1000, 1000, 1001, 1001, 1002, 1001, 999, 1000],
  },
  {
    archive_data: {
      id: 7,
      wind: "15.534",
      pressure: "1001",
      name: "BUREVI",
      original_img:
        "media/archive/3DIMG_03JAN2019_0300_L1C_ASIA_MER_IR1_V01R00.jpg",
      category: 0,
      t_number: 1,
    },
    data_exists: false,
    next_wind_data: [
      14.288, 13.54, 12.22, 13.421, 13.2981, 12.835, 12.511, 12.254,
    ],
    previous_wind_data: [
      10.317, 10.496, 10.502, 12.174, 14.052, 15.55, 15.494, 14.654,
    ],
    next_pressure_data: [1002, 1000, 1000, 1002, 1001, 1000, 999, 998],
    previous_pressure_data: [1000, 1001, 1001, 1002, 1001, 999, 1000, 1001],
  },
  {
    archive_data: {
      id: 8,
      wind: "14.288",
      pressure: "1002",
      name: "BUREVI",
      original_img:
        "media/archive/3DIMG_03JAN2019_0600_L1C_ASIA_MER_IR1_V01R00.jpg",
      category: 0,
      t_number: 1,
    },
    data_exists: false,
    next_wind_data: [
      13.54, 12.22, 13.421, 13.2981, 12.835, 12.511, 12.254, 12.407,
    ],
    previous_wind_data: [
      10.496, 10.502, 12.174, 14.052, 15.55, 15.494, 14.654, 15.534,
    ],
    next_pressure_data: [1000, 1000, 1002, 1001, 1000, 999, 998, 999],
    previous_pressure_data: [1001, 1001, 1002, 1001, 999, 1000, 1001, 1001],
  },
  {
    archive_data: {
      id: 9,
      wind: "13.54",
      pressure: "1000",
      name: "BUREVI",
      original_img:
        "media/archive/3DIMG_03JAN2019_0900_L1C_ASIA_MER_IR1_V01R00.jpg",
      category: 0,
      t_number: 1,
    },
    data_exists: false,
    next_wind_data: [
      12.22, 13.421, 13.2981, 12.835, 12.511, 12.254, 12.407, 11.764,
    ],
    previous_wind_data: [
      10.502, 12.174, 14.052, 15.55, 15.494, 14.654, 15.534, 14.288,
    ],
    next_pressure_data: [1000, 1002, 1001, 1000, 999, 998, 999, 999],
    previous_pressure_data: [1001, 1002, 1001, 999, 1000, 1001, 1001, 1002],
  },
  {
    archive_data: {
      id: 10,
      wind: "12.22",
      pressure: "1000",
      name: "BUREVI",
      original_img:
        "media/archive/3DIMG_03JAN2019_1200_L1C_ASIA_MER_IR1_V01R00.jpg",
      category: 0,
      t_number: 1,
    },
    data_exists: false,
    next_wind_data: [
      13.421, 13.2981, 12.835, 12.511, 12.254, 12.407, 11.764, 11.804,
    ],
    previous_wind_data: [
      12.174, 14.052, 15.55, 15.494, 14.654, 15.534, 14.288, 13.54,
    ],
    next_pressure_data: [1002, 1001, 1000, 999, 998, 999, 999, 1000],
    previous_pressure_data: [1002, 1001, 999, 1000, 1001, 1001, 1002, 1000],
  },
];

const Archive = () => {
  const [visible, setVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [archiveDate, setArchiveDate] = useState("2023-12-04");
  const [archiveTime, setArchiveTime] = useState("12:00:00");
  const [archiveData, setArchiveData] = useState({
    archive_data: {
      id: 662,
      wind: "0.00000",
      pressure: "0.00",
      name: "BUREVI",
      original_img: "/archive.jpg",
      timestamp: "2020-12-04T09:00:00+05:30",
      category: 0,
      t_number: 1,
    },
    data_exists: true,
    next_wind_data: [25.0, 25.0, 25.0, 25.0, 20.0, 20.0, 20.0, 0.0],
    previous_wind_data: [35.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0],
    next_pressure_data: [
      1002.0, 1002.0, 1003.0, 1003.0, 1004.0, 1006.0, 1006.0, 0.0,
    ],
    previous_pressure_data: [
      999.0, 1000.0, 1000.0, 1000.0, 1000.0, 1000.0, 1001.0, 1001.0,
    ],
  });

  const [mainTimezone, setMainTimezone] = useState("IST");
  const [windData, setWindData] = useState([
    {
      name: "00:00",
      Wind: 30.0,
    },
    {
      name: "00:00",
      Wind: 30.0,
    },
    {
      name: "00:00",
      Wind: 30.0,
    },
    {
      name: "00:00",
      Wind: 30.0,
    },
    {
      name: "03:00",
      Wind: 30.0,
    },
    {
      name: "06:00",
      Wind: 35.0,
    },
    {
      name: "09:00",
      Wind: 0.0,
    },
    {
      name: "12:00",
      Wind: 25.0,
    },
    {
      name: "15:00",
      Wind: 25.0,
    },
    {
      name: "18:00",
      Wind: 25.0,
    },
    {
      name: "21:00",
      Wind: 25.0,
    },
    {
      name: "00:00",
      Wind: 20.0,
    },
  ]);

  const [pressureData, setPressureData] = useState([
    {
      name: "00:00",
      Pressure: 1000.0,
    },
    {
      name: "00:00",
      Pressure: 1000.0,
    },
    {
      name: "00:00",
      Pressure: 1000.0,
    },
    {
      name: "00:00",
      Pressure: 1000.0,
    },
    {
      name: "03:00",
      Pressure: 1000.0,
    },
    {
      name: "06:00",
      Pressure: 999.0,
    },
    {
      name: "09:00",
      Pressure: 1000.0,
    },
    {
      name: "12:00",
      Pressure: 1002.0,
    },
    {
      name: "15:00",
      Pressure: 1002.0,
    },
    {
      name: "18:00",
      Pressure: 1003.0,
    },
    {
      name: "21:00",
      Pressure: 1003.0,
    },
    {
      name: "00:00",
      Pressure: 1004.0,
    },
  ]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  function convertDateTime(
    currentDate,
    currentTime,
    targetTimeZoneAcronym,
    currentTimeZoneAcronym
  ) {
    const inputDateTime = new Date(`${currentDate}T${currentTime}`);

    const timeZoneOffsets = {
      BIT: -12 * 60,
      SST: -11 * 60,
      HST: -10 * 60,
      AKST: -9 * 60,
      PST: -8 * 60,
      MST: -7 * 60,
      CST: -6 * 60,
      EST: -5 * 60,
      AST: -4 * 60,
      NST: -3.5 * 60,
      GMT: 0,
      CET: 1 * 60,
      EET: 2 * 60,
      MSK: 3 * 60,
      PKT: 5 * 60,
      IST: 5.5 * 60,
      BST: 6 * 60,
      CST: 8 * 60,
      JST: 9 * 60,
      AEST: 10 * 60,
      NZST: 12 * 60,
    };

    if (!timeZoneOffsets.hasOwnProperty(targetTimeZoneAcronym)) {
      return { date: currentDate, time: currentTime };
    }

    const targetOffset = timeZoneOffsets[targetTimeZoneAcronym];
    const currentOffsetMinutes =
      timeZoneOffsets[currentTimeZoneAcronym] ||
      inputDateTime.getTimezoneOffset();

    const adjustedTime =
      inputDateTime.getTime() - (currentOffsetMinutes - targetOffset) * 60000;
    const targetDateTime = new Date(adjustedTime);
    const targetDateString = targetDateTime.toISOString().split("T")[0];
    const targetTimeString = targetDateTime
      .toISOString()
      .split("T")[1]
      .split(".")[0];

    if (currentTimeZoneAcronym === targetTimeZoneAcronym)
      return { date: archiveDate, time: archiveTime };
    return { date: targetDateString, time: targetTimeString };
  }

  function convertTimestampToTimeZone(timestampString, targetTimeZoneAcronym) {
    const timestamp = new Date(timestampString);

    const timeZoneOffsets = {
      BIT: -12 * 60,
      SST: -11 * 60,
      HST: -10 * 60,
      AKST: -9 * 60,
      PST: -8 * 60,
      MST: -7 * 60,
      CST: -6 * 60,
      EST: -5 * 60,
      AST: -4 * 60,
      NST: -3.5 * 60,
      GMT: 0,
      CET: 1 * 60,
      EET: 2 * 60,
      MSK: 3 * 60,
      PKT: 5 * 60,
      IST: 5.5 * 60,
      BST: 6 * 60,
      CST: 8 * 60,
      JST: 9 * 60,
      AEST: 10 * 60,
      NZST: 12 * 60,
    };

    if (!timeZoneOffsets.hasOwnProperty(targetTimeZoneAcronym)) {
      return timestampString;
    }
    const istOffset = timeZoneOffsets["IST"];
    const targetOffset = timeZoneOffsets[targetTimeZoneAcronym];
    const adjustedTimestamp = new Date(
      timestamp.getTime() + (targetOffset - istOffset) * 60000
    );
    const adjustedTimestampString = adjustedTimestamp.toISOString();

    return adjustedTimestampString;
  }

  function sumNumbersInStringModulo(str) {
    const numbers = str.match(/\d+/g);
    if (!numbers) return 0;
    const sum = numbers.reduce((total, num) => total + parseInt(num), 0);
    return sum % 10;
  }

  async function handleArchiveRequest() {
    //Uncomment for fetch
    try {
      const currTimezone = "IST";
      const convertedDateTime = convertDateTime(
        archiveDate,
        archiveTime,
        currTimezone,
        mainTimezone
      );
      const formData = new FormData();
      formData.append(
        "timestamp",
        `${convertedDateTime.date} ${convertedDateTime.time}`
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_ADDRESS_URL}/data/archive/`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.data_exists) {
        setArchiveData(data);
        const {
          archive_data,
          next_wind_data,
          previous_wind_data,
          next_pressure_data,
          previous_pressure_data,
        } = data;
        const { wind, pressure, timestamp } = archive_data;
        const currentDate = new Date(
          convertTimestampToTimeZone(timestamp, mainTimezone)
        );
        const formatTime = (date) =>
          `${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
          ).padStart(2, "0")}`;
        const previousWindObjects = previous_wind_data.map(
          (windValue, index) => ({
            name: formatTime(
              new Date(currentDate.getTime() - (index + 1) * 3 * 60 * 60 * 1000)
            ),
            Wind: windValue,
          })
        );
        const currentWindObject = {
          name: formatTime(currentDate),
          Wind: parseFloat(wind),
        };
        const nextWindObjects = next_wind_data.map((windValue, index) => ({
          name: formatTime(
            new Date(currentDate.getTime() + (index + 1) * 3 * 60 * 60 * 1000)
          ),
          Wind: windValue,
        }));
        const previousPressureObjects = previous_pressure_data.map(
          (pressureValue, index) => ({
            name: formatTime(
              new Date(currentDate.getTime() - (index + 1) * 3 * 60 * 60 * 1000)
            ),
            Pressure: pressureValue,
          })
        );
        const currentPressureObject = {
          name: formatTime(currentDate),
          Pressure: parseFloat(pressure),
        };
        const nextPressureObjects = next_pressure_data.map(
          (pressureValue, index) => ({
            name: formatTime(
              new Date(currentDate.getTime() + (index + 1) * 3 * 60 * 60 * 1000)
            ),
            Pressure: pressureValue,
          })
        );
        const windResult = [
          ...previousWindObjects.reverse(),
          currentWindObject,
          ...nextWindObjects,
        ];
        const newWind = windResult.splice(1, 17);
        setWindData(newWind);
        const pressureResult = [
          ...previousPressureObjects.reverse(),
          currentPressureObject,
          ...nextPressureObjects,
        ];
        const newPressure = pressureResult.splice(1, 17);
        setPressureData(newPressure);
        // setPressureData(pressureResult);
      } else {
        console.log("ELSE");
        const newArchiveData =
          dataArray[sumNumbersInStringModulo(`${archiveDate} ${archiveTime}`)];
        setArchiveData(newArchiveData);
        const {
          archive_data,
          next_wind_data,
          previous_wind_data,
          next_pressure_data,
          previous_pressure_data,
        } = newArchiveData;
        const { wind, pressure } = archive_data;

        var dateComponents = archiveDate.split("-");
        var year = parseInt(dateComponents[0]);
        var month = parseInt(dateComponents[1]) - 1;
        var day = parseInt(dateComponents[2]);

        var timeComponents = archiveTime.split(":");
        var hour = parseInt(timeComponents[0]);
        var minute = parseInt(timeComponents[1]);
        var second = parseInt(timeComponents[2]);

        var combinedDate = new Date(year, month, day, hour, minute, second);

        const currentDate = new Date(
          convertTimestampToTimeZone(combinedDate, mainTimezone)
        );
        const formatTime = (date) =>
          `${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
          ).padStart(2, "0")}`;
        const previousWindObjects = previous_wind_data.map(
          (windValue, index) => ({
            name: formatTime(
              new Date(currentDate.getTime() - (index + 1) * 3 * 60 * 60 * 1000)
            ),
            Wind: windValue,
          })
        );
        const currentWindObject = {
          name: formatTime(currentDate),
          Wind: parseFloat(wind),
        };
        const nextWindObjects = next_wind_data.map((windValue, index) => ({
          name: formatTime(
            new Date(currentDate.getTime() + (index + 1) * 3 * 60 * 60 * 1000)
          ),
          Wind: windValue,
        }));
        const previousPressureObjects = previous_pressure_data.map(
          (pressureValue, index) => ({
            name: formatTime(
              new Date(currentDate.getTime() - (index + 1) * 3 * 60 * 60 * 1000)
            ),
            Pressure: pressureValue,
          })
        );
        const currentPressureObject = {
          name: formatTime(currentDate),
          Pressure: parseFloat(pressure),
        };
        const nextPressureObjects = next_pressure_data.map(
          (pressureValue, index) => ({
            name: formatTime(
              new Date(currentDate.getTime() + (index + 1) * 3 * 60 * 60 * 1000)
            ),
            Pressure: pressureValue,
          })
        );
        const windResult = [
          ...previousWindObjects.reverse(),
          currentWindObject,
          ...nextWindObjects,
        ];
        const newWind = windResult.splice(1, 17);
        setWindData(newWind);
        const pressureResult = [
          ...previousPressureObjects.reverse(),
          currentPressureObject,
          ...nextPressureObjects,
        ];
        const newPressure = pressureResult.splice(1, 17);
        setPressureData(newPressure);
        // setPressureData(pressureResult);
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  }

  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    } else {
      router.push("/archive");
    }
  }, [router, session]);

  async function logData() {
    const currTimezone = "IST";
    const convertedDateTime = convertDateTime(
      archiveDate,
      archiveTime,
      currTimezone,
      mainTimezone
    );
    const formData = new FormData();
    formData.append(
      "timestamp",
      `${convertedDateTime.date} ${convertedDateTime.time}`
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_IP_ADDRESS_URL}/data/archive/`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    setArchiveData(data);
    const {
      archive_data,
      next_wind_data,
      previous_wind_data,
      next_pressure_data,
      previous_pressure_data,
    } = data;
    const { wind, pressure, timestamp } = archive_data;

    const currentDate = new Date(
      convertTimestampToTimeZone(timestamp, mainTimezone)
    );

    const formatTime = (date) =>
      `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`;

    const previousWindObjects = previous_wind_data.map((windValue, index) => ({
      name: formatTime(
        new Date(currentDate.getTime() - (index + 1) * 3 * 60 * 60 * 1000)
      ),
      Wind: windValue,
    }));

    const currentWindObject = {
      name: formatTime(currentDate),
      Wind: parseFloat(wind),
    };

    const nextWindObjects = next_wind_data.map((windValue, index) => ({
      name: formatTime(
        new Date(currentDate.getTime() + (index + 1) * 3 * 60 * 60 * 1000)
      ),
      Wind: windValue,
    }));

    const previousPressureObjects = previous_pressure_data.map(
      (pressureValue, index) => ({
        name: formatTime(
          new Date(currentDate.getTime() - (index + 1) * 3 * 60 * 60 * 1000)
        ),
        Pressure: pressureValue,
      })
    );

    const currentPressureObject = {
      name: formatTime(currentDate),
      Pressure: parseFloat(pressure),
    };

    const nextPressureObjects = next_pressure_data.map(
      (pressureValue, index) => ({
        name: formatTime(
          new Date(currentDate.getTime() + (index + 1) * 3 * 60 * 60 * 1000)
        ),
        Pressure: pressureValue,
      })
    );

    const windResult = [
      ...previousWindObjects.reverse(),
      currentWindObject,
      ...nextWindObjects,
    ];

    const newWind = windResult.splice(1, 17);
    setWindData(newWind);

    const pressureResult = [
      ...previousPressureObjects.reverse(),
      currentPressureObject,
      ...nextPressureObjects,
    ];
    const newPressure = pressureResult.splice(1, 17);
    setPressureData(newPressure);
    // setPressureData(pressureResult);
  }

  // Un comment below for fetching:
  useEffect(() => {
    //Uncomment for fetch
    logData();
  }, []);

  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const cycloneCopyHandler = () => {
    const newData = {
      ...data,
      [`Archive Cyclone (${archiveData.archive_data.timestamp})`]: `${archiveData.archive_data.name}`,
    };
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    toast.success("Cyclone Name Copied To Logs!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const cycloneClipboardHandler = () => {
    const textToCopy = `Archive Cyclone (${archiveData.archive_data.timestamp}): ${archiveData.archive_data.name}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Cyclone Name Copied To Clipboard!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        console.log("Info copied to clipboard:", textToCopy);
      })
      .catch((error) => {
        console.error("Failed to copy info to clipboard:", error);
        toast.error("Failed To Copy To Clipboard!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const cycloneWebSearchHandler = () => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        `Cyclone Name: ${archiveData.archive_data.name}`
      )}`,
      "_blank"
    );
  };

  const cycloneChatbotHandler = () => {
    setQuestions((prevQuestions) => {
      const newQuestions = [
        `The cyclone at ${archiveData.archive_data.timestamp} is ${archiveData.archive_data.name} on the Indian Ocean. Can you please give information about this cyclone?`,
        ...prevQuestions,
      ];
      localStorage.setItem("questions", JSON.stringify(newQuestions));
      return newQuestions;
    });
    toast.success("Cyclone Name Copied To Questions!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const actions = [
    {
      icon: (
        <IconButton onClick={cycloneClipboardHandler}>
          <FileCopyIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Copy to Clipboard",
    },
    {
      icon: (
        <IconButton onClick={cycloneCopyHandler}>
          <ExitToAppIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Copy to Logs",
    },
    {
      icon: (
        <IconButton onClick={cycloneWebSearchHandler}>
          <TravelExploreIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Search the Web",
    },
    {
      icon: (
        <IconButton onClick={cycloneChatbotHandler}>
          <ContactSupportIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Ask the Chatbot",
    },
  ];

  if (session) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div
          className="bg-black flex items-center p-6 h-screen w-screen"
          onClick={() => {
            setNotesVisible(false);
            setVisible(false);
          }}
        >
          <NavBar
            setVisible={setVisible}
            visible={visible}
            setNotesVisible={setNotesVisible}
            notesVisible={notesVisible}
          />
          <div className="flex items-center rounded-lg h-full w-full">
            <div className="flex flex-col h-full">
              <div className="flex-none h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-6 mr-6">
                ARCHIVES
              </div>
              <div className="h-fit bg-white bg-opacity-10 rounded-lg w-80 mr-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["StaticDateTimePicker"]}
                    sx={{
                      margin: 0,
                      padding: 0,
                      "& .MuiStack-root": {
                        margin: 0,
                        padding: 0,
                      },
                    }}
                  >
                    <StaticDateTimePicker
                      onChange={(newValue) => {
                        setArchiveDate(dayjs(newValue).format("YYYY-MM-DD"));
                        const time = {
                          hour: dayjs(newValue).format("HH"),
                          second: dayjs(newValue).format("ss"),
                        };
                        var minutes = Number(dayjs(newValue).format("mm"));
                        if (minutes >= 30) {
                          time.minute = "30";
                        } else {
                          time.minute = "00";
                        }
                        setArchiveTime(
                          time.hour + ":" + time.minute + ":" + time.second
                        );
                      }}
                      defaultValue={dayjs("2023-12-04T12:00")}
                      sx={{
                        height: "29vw",
                        "& .MuiPickersCalendarHeader-root": {
                          height: "29vw",
                        },
                        "& .MuiDialogActions-root": {
                          display: "none",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="h-full bg-white bg-opacity-10 rounded-lg mt-3 mr-6 flex flex-col text-sm">
                <div className="w-full rounded-lg bg-white bg-opacity-20 text-center mb-2">
                  CYCLONE DETAILS
                </div>
                <div className="relative w-full h-full bg-white bg-opacity-10 rounded-lg text-sm flex flex-col justify-center text-center">
                  {archiveData.data_exists
                    ? "CYCLONE: " + archiveData.archive_data.name
                    : "No Cyclone!"}
                  <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{
                      position: "absolute",
                      bottom: "0.2rem",
                      right: 0,
                      // top:0,
                      // left:0,
                      "& .MuiButtonBase-root:hover": {
                        background: "white",
                        color: "black",
                        border: 2,
                      },
                      "& .MuiButtonBase-root": {
                        color: "rgba(255,255,255,0.5)",
                        background: "black",
                        border: 2,
                      },
                      "& .MuiSpeedDial-fab": {
                        height: "2.5rem",
                        width: "2.5rem",
                      },
                    }}
                    icon={
                      <SpeedDialIcon
                        sx={{
                          // marginBottom: "4px",
                          "& .MuiSpeedDialIcon-icon": {
                            fontSize: 20,
                          },
                        }}
                      />
                    }
                    hidden={!archiveData.data_exists}
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                      />
                    ))}
                  </SpeedDial>
                </div>
              </div>
              <button
                className="flex-none text-sm h-30 bg-white bg-opacity-50 rounded-lg text-white text-center p-2 w-80 mt-5 mr-6 hover:bg-opacity-100 transition ease-in-out delay-150 hover:text-zinc-950"
                onClick={handleArchiveRequest}
              >
                SUBMIT
              </button>
            </div>

            <div className="relative flex flex-col items-center rounded-lg h-full w-full">
              {/* <ArchiveTimeDateBar /> */}
              <ArchivePictureBar
                date={archiveDate}
                time={archiveTime}
                wind={windData}
                pressure={pressureData}
                // original={archiveData.archive_data.original_img}
                timezone={mainTimezone}
                original={
                   `${process.env.NEXT_PUBLIC_IP_ADDRESS_URL}/` +
                  archiveData.archive_data.original_img
                }
              />
              <ArchivePredictionBar
                windIntensity={archiveData.archive_data.wind}
                windPressure={archiveData.archive_data.pressure}
                windCategory={archiveData.archive_data.category}
                date={`${archiveDate}-${archiveTime}`}
                setMainTimezone={setMainTimezone}
              />
              <MiniChatbot visible={visible} />
              <NoteTaker notesVisible={notesVisible} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
  return (
    <div className="w-screen h-screen bg-black">
      {/* {useEffect(() => {
        router.push('/');
      })} */}
    </div>
  );
};

export default Archive;
