import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveToNextStage } from "./actions";

function PizzaStages() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [stageTimes, setStageTimes] = useState({});

  const calculateTimeSpent = (order) => {
    if (!stageTimes[order.id]) {
      return 0;
    }
    const currentTime = new Date();
    const stageStartTime = new Date(stageTimes[order.id]);
    const timeDiff = Math.abs(currentTime - stageStartTime);
    const minutesSpent = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    console.log(minutesSpent)
    return minutesSpent;
  };

  const handleNextStage = (orderId) => {
    // Get the current stage of the order
    const currentOrder = data.ordersInProgress.find(
      (order) => order.id === orderId
    );
    // Determine the next stage based on the current stage
    let nextStage;
    switch (currentOrder.stage) {
      case "Order Placed":
        nextStage = "Order In Making";
        break;
      case "Order In Making":
        nextStage = "Order Ready";
        break;
      case "Order Ready":
        nextStage = "Order Picked"; // Update the stage to "Order Picked"
        break;
      case "Order Picked":
        nextStage = "Order Picked";
        break;
      default:
        nextStage = currentOrder.stage;
    }
    // Dispatch the moveToNextStage action with orderId and nextStage
    dispatch(moveToNextStage(orderId, nextStage));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setStageTimes((prevTimes) => {
        const updatedTimes = {};
        for (const orderId in prevTimes) {
          updatedTimes[orderId] = prevTimes[orderId];
        }
        data.ordersInProgress.forEach((order) => {
          updatedTimes[order.id] = updatedTimes[order.id] || new Date();
        });
        return updatedTimes;
      });
    }, 60000); // Update stage time every minute

    return () => clearInterval(interval);
  }, [data.ordersInProgress]);
  console.log("abhay", data);

  return (
    <>
      <h1 className="text-start">Pizza Stages Section</h1>

      <div className="flex justify-center gap-2 mt-5">
        <div className="w-96 h-96 border-slate-950 border-2 overflow-y-scroll">
          <p className="text-center p-2 font-semibold">Order Placed</p>
          {data.ordersInProgress && data.ordersInProgress.length > 0 ? (
            data.ordersInProgress.map((order) =>
              order.stage == "Order Placed" ? (
                <div
                className={`w-40 h-24 p-1 border-slate-950 border-2 rounded-md text-center m-auto mt-5 bg-purple-400 text-white ${
                  calculateTimeSpent(order) >= 3 ? "bg-red-500" : ""
       
     }`}                  key={order.id}
                >
                  <p>{order.id}</p>
                  <p>{calculateTimeSpent(order)} Min</p>
                  <button
                    onClick={() => handleNextStage(order.id)}
                    type="button"
                    className="focus:outline-none text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 mt-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Next Stage
                  </button>
                </div>
              ) : (
                ""
              )
            )
          ) : (
            <p>Order Not Placed</p>
          )}
        </div>
        <div className="w-96 h-96 border-slate-950 border-2 overflow-y-scroll">
          <p className="text-center p-2 font-semibold">Order In Making</p>
          {/* Replace this with Redux state */}
          {data.ordersInProgress && data.ordersInProgress.length > 0 ? (
            data.ordersInProgress.map((order) =>
              order.stage == "Order In Making" ? (
                <div
                className={`w-40 h-24 p-1 border-slate-950 border-2 rounded-md text-center m-auto mt-5 bg-blue-500 text-white ${
                  calculateTimeSpent(order) >= 3 ? "bg-red-500 text-white" : ""
       
     }`}                  key={order.id}
                >
                  <p>{order.id}</p>
                  <p>{calculateTimeSpent(order)} Min</p>
                  <button
                    onClick={() => handleNextStage(order.id)}
                    type="button"
                    className="focus:outline-none text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 mt-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Next Stage
                  </button>
                </div>
              ) : (
                ""
              )
            )
          ) : (
            <p></p>
          )}
          {/* {currentStage >= 2 && <p>Second stage content</p>} */}
        </div>
        <div className="w-96 h-96 border-slate-950 border-2 overflow-y-scroll">
          <p className="text-center p-2 font-semibold">Order Ready</p>
          {/* Replace this with Redux state */}
          {data.ordersInProgress && data.ordersInProgress.length > 0 ? (
            data.ordersInProgress.map((order) =>
              order.stage == "Order Ready" ? (
                <div
                className={`w-40 h-24 p-1 border-slate-950 border-2 rounded-md text-center m-auto mt-5 bg-yellow-500 ${
                  calculateTimeSpent(order) >= 3 ? "bg-red-500 text-white" : ""
       
     }`}                  key={order.id}
                >
                  <p>{order.id}</p>
                  <p>3 Min 10 Sec</p>
                  <button
                    onClick={() => handleNextStage(order.id)}
                    type="button"
                    className="focus:outline-none text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 mt-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Next Stage
                  </button>
                </div>
              ) : (
                ""
              )
            )
          ) : (
            <p></p>
          )}
          {/* {currentStage >= 3 && <p>Third stage content</p>} */}
        </div>
        <div className="w-96 h-96 border-slate-950 border-2 overflow-y-scroll">
          <p className="text-center p-2 font-semibold">Order Picked</p>
          {/* Replace this with Redux state */}
          {data.ordersInProgress && data.ordersInProgress.length > 0 ? (
            data.ordersInProgress.map((order) =>
              order.stage == "Order Picked" ? (
                <div
                className={`w-40 h-24 p-1 border-slate-950 border-2 rounded-md text-center m-auto mt-5 bg-green-800  text-white ${
                  calculateTimeSpent(order) >= 3 ? "bg-red-500" : ""
       
     }`}                  key={order.id}
                >
                  <p>{order.id}</p>
                  <button className="focus:outline-none text-white focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-1 mt-1.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 cursor-default">
                    Order Picked
                  </button>
                </div>
              ) : (
                ""
              )
            )
          ) : (
            <p></p>
          )}
          {/* {currentStage >= 4 && <p>Fourth stage content</p>} */}
        </div>
      </div>
    </>
  );
}

export default PizzaStages;