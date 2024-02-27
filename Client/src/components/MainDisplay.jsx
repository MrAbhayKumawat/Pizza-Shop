import React from "react";
import "../components/MainDisplay.css";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, moveToNextStage } from "./actions";

function MainDisplay() {
  const dispatch = useDispatch();
  const ordersInProgress = useSelector((state) => state.ordersInProgress);

  const handleMoveToNextStage = (orderId) => {
    dispatch(moveToNextStage(orderId));
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  return (
    <>
      <h3 className="text-start mt-5 font-semibold">Main Section</h3>
      <table className="mt-5">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stage</th>
            <th>Total time spent (time from order placed)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ordersInProgress.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.stage}</td>
              <td>NA</td>
              <td>
                <button onClick={() => handleCancelOrder(order.id)} className="bg-red-500 text-white p-2 rounded-sm px-5">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td style={{ width: "15.4%" }}>
              <strong>Total order delivered</strong>
            </td>
            <td>
              {
                ordersInProgress.filter(
                  (order) => order.stage == "Order Picked"
                ).length
              }
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default MainDisplay;
