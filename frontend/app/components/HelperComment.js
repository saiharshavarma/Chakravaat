"use client";

import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";

export default function HelperComment({ message, setProcessObj }) {
  // console.log(message);
  const [response, setResponse] = useState("");
  const [answer, setAnswer] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [issueDisabled, setIssueDisabled] = useState(false);

  function responseHandler(response) {
    const processObj = { step: message.step, response: response };
    setProcessObj(processObj);
  }
  return (
    <div className="w-full p-4 border border-white border-opacity-20 rounded-lg mt-4">
      <div className="w-full rounded-lg bg-white bg-opacity-15 p-4">
        {message.step}
      </div>
      <div className="w-full rounded-lg bg-white bg-opacity-20 mt-4 p-4 text-center">
        Have you completed this step?
      </div>
      <div className="flex w-full mt-4">
        <button
          className={
            message.response || disabled
              ? "w-1/2 mr-4 bg-white bg-opacity-15 rounded-lg p-2 opacity-50"
              : "w-1/2 mr-4 bg-white bg-opacity-15 rounded-lg p-2 hover:bg-opacity-100 hover:text-black transition ease-in-out delay-150"
          }
          onClick={() => {
            setDisabled(true);
            setResponse("Yes");
            setAnswer("Yes");
            responseHandler("Yes");
          }}
          disabled={message.response || disabled ? true : false}
        >
          YES
        </button>
        <button
          className={
            message.response || disabled
              ? "w-1/2 mr-4 bg-white bg-opacity-15 rounded-lg p-2 opacity-50"
              : "w-1/2 bg-white bg-opacity-15 rounded-lg p-2 hover:bg-opacity-100 hover:text-black transition ease-in-out delay-150"
          }
          onClick={() => {
            setDisabled(true);
            setAnswer("No");
          }}
          disabled={message.response || disabled ? true : false}
        >
          NO
        </button>
      </div>
      {answer === "No" || (message.response !== "Yes" && message.response) ? (
        <div className="flex flex-col">
          <div className="w-full rounded-lg p-4 bg-white bg-opacity-20 mt-4">
            <TextField
              id="filled-basic"
              placeholder="Issue Faced"
              variant="filled"
              className={
                message.response || issueDisabled
                  ? "w-full opacity-50"
                  : "w-full"
              }
              onChange={(event) => {
                setResponse(event.target.value);
              }}
              disabled={message.response || issueDisabled ? true : false}
              value={message.response ? message.response : response}
            />
          </div>
          <button
            className={
              message.response || issueDisabled
                ? "w-full bg-white bg-opacity-15 rounded-lg p-2 opacity-50 mt-4"
                : "w-full bg-white bg-opacity-15 rounded-lg p-2 hover:bg-opacity-100 hover:text-black transition ease-in-out delay-150 mt-4"
            }
            onClick={() => {
              setIssueDisabled(true);
              responseHandler(response);
            }}
            disabled={message.response || issueDisabled ? true : false}
          >
            SUBMIT
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
