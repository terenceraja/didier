import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

function LogPage() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [ticketForm, setTicketForm] = useState({
    title: "",
    ticketNumber: "",
    surname: "",
    problem: "",
    priority: "",
    status: "",
  });
  console.log(ticketForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTicketForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleGenerate = () => {
    const minm = 100000;
    const maxm = 999999;
    const number = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    setTicketForm((prev) => {
      return { ...prev, ["ticketNumber"]: number };
    });
  };

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  return (
    <div
      id="mainContainer"
      className="flex justify-center items-center h-screen"
    >
      <div className="flex flex-wrap justify-content-center gap-2 mb-2">
        <Button
          label="Left"
          icon="pi pi-arrow-right"
          onClick={() => show("left")}
          className="p-button-help"
          style={{ minWidth: "10rem" }}
        />
      </div>

      <Dialog
        header="Create Ticket"
        visible={visible}
        position={position}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Title</label>
            <input
              className="h-10 p-5"
              type="text"
              name="title"
              onChange={handleOnChange}
              required
            />
          </div>

          <div id="inputContainer&button" className="flex flex-col">
            <label>Ticket Number</label>
            <div id="inputContainer&Btn" className="flex gap-1">
              <input
                className="h-10 p-5"
                type="text"
                name="title"
                onChange={handleOnChange}
                value={ticketForm.ticketNumber}
                placeholder="Generate a Number..."
                required
              />
              <button
                className="cursor-pointer hover:bg-[#12ffa8] border-dashed h-11 font-bold bg-[#97f0cf]  "
                onClick={handleGenerate}
                type="button"
              >
                Generate
              </button>
            </div>
          </div>
          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Problem</label>
            <textarea
              className="p-2"
              onChange={handleOnChange}
              required
              name="problem"
              rows="5"
              cols="33"
              value={ticketForm.problem}
            >
              Describe the problem
            </textarea>
          </div>

          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Priority</label>
            <select
              required
              onChange={handleOnChange}
              name="priority"
              className="p-2"
            >
              <option value="">Select an option</option>

              <option value="critical">CRITICAL</option>
              <option value="high">HIGH PRIORITY</option>
              <option value="medium">MEDIUM PRIORITY</option>
              <option value="low">LOW PRIORITY</option>
              <option value="min">MINIMAL PRIORITY</option>
            </select>
          </div>

          {/* <div id="inputContainer" className="flex flex-col gap-1">
            <label>Status</label>
            <select
              required
              value={ticketForm.status}
              onChange={handleOnChange}
              name="status"
              className="p-2"
            >
              <option value="">Select an option</option>
              <option value="open">OPEN</option>
              <option value="progress">IN PROGRESS</option>
              <option value="closed">CLOSED</option>
            </select>
          </div> */}

          <div id="Cancel&Submit" className="flex gap-2 self-center ">
            <button
              onClick={() => setVisible(false)}
              className="cursor-pointer hover:bg-[#12ffa8] w-20 h-10 font-bold bg-[#97f0cf]  "
              type="submit"
            >
              Cancel
            </button>

            <button
              className="cursor-pointer hover:bg-[#12ffa8] w-20 h-10 font-bold bg-[#97f0cf]  "
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default LogPage;
