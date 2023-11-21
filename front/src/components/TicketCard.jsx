import React from "react";

const TicketCard = (props) => {
  return (
    <div className="bg-red-500">
      <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
          <div className="flex flex-column align-items-center sm:align-items-start gap-3">
            <div className="text-2xl font-bold text-900"></div>

            <div className="flex align-items-center gap-3"></div>
          </div>
          <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
            <span className="text-2xl font-semibold">ssegseg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
