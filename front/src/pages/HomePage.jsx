import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";

function HomePage() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [ticketForm, setTicketForm] = useState({
    title: "String",
    ticketNumber: null,
    surname: "",
    problem: "",
    priority: "",
    status: "",
  });
  console.log(ticketForm);
  const [priorityState, setPriorityState] = useState("");
  const priorities = [
    { name: "CRITICAL" },
    { name: "HIGH PRIORITY" },
    { name: "MEDIUM PRIORITY" },
    { name: "LOW PRIORITY" },
    { name: "MINIMAL PRIORITY" },
  ];

  const [statusState, setStatusState] = useState("");
  const status = [
    { name: "OPEN" },
    { name: "IN PROGRESS" },
    { name: "CLOSED" },
  ];

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

  const handleDropSelect1 = (e) => {
    setPriorityState(e.target.value);
    setTicketForm((prev) => {
      return { ...prev, ["priority"]: e.target.value.name };
    });
  };

  const handleDropSelect2 = (e) => {
    setStatusState(e.target.value);
    setTicketForm((prev) => {
      return { ...prev, ["status"]: e.target.value.name };
    });
  };
  console.log("haha", ticketForm.status);
  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Create"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };
  const [value, setValue] = useState("");
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
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
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

        <div id="inputContainer&button" className="flex flex-col ">
          <label>Title</label>
          <div id="inputContainer" className="flex">
            <input
              className="h-10 p-5"
              type="text"
              name="title"
              value={ticketForm.ticketNumber}
              placeholder="Generate a Number..."
              required
              readOnly
            />
            <Button
              label="Generate"
              icon="pi pi-arrow-right"
              onClick={handleGenerate}
              className="p-button-help text-center h-15 w-30 flex justify-center"
            />
          </div>
        </div>
        <InputTextarea
          autoResize
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={8}
          cols={60}
        />

        <Dropdown
          value={priorityState}
          onChange={(e) => handleDropSelect1(e)}
          options={priorities}
          optionLabel="name"
          placeholder="Select a Priority"
          className="w-full md:w-14rem"
        />

        <Dropdown
          value={statusState}
          onChange={(e) => handleDropSelect2(e)}
          options={status}
          optionLabel="name"
          placeholder="Select a Status"
          className="w-full md:w-14rem"
        />
      </Dialog>
    </div>
  );
}

export default HomePage;
