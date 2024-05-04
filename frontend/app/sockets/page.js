'use client'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Sockets = () => {
    const [data, setData] = useState()
    
    // const socket = io("ws://example.com/my-namespace", {
    //     reconnectionDelayMax: 10000,
    //     auth: {
    //         token: "123"
    //     },
    //     query: {
    //         "my-key": "my-value"
    //     }
    //     });

    async function logData() {
        const response = await fetch("http://127.0.0.1:8000/predictions");
        const dataset = await response.json();
        setData(dataset)
        console.log(dataset);
    }
    
    // const useSocketListener = (socket, event, handler) => {
    //     useEffect(() => {
    //         if (socket) socket.on(event, handler);
            
    //         return () => {
    //             if (socket) socket.off(event, handler);
    //         };
    //     }, [socket, event, handler]);
    //     };

    // const regularDataHandler = (newData) => {
    //     setData(newData)
    // }
    useEffect(() => {
        logData()
    },[])
    
    // useSocketListener(socket, "newDataEntry", regularDataHandler)

    return(
        <div className="text-white">
            {data} 
        </div>
    )
}

export default Sockets