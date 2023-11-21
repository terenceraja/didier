import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import TicketCard from "../components/TicketCard";

function LogPage() {
  const [tickets, setTickets] = useState(null);
  const [ticketDetail, setTicketDetail] = useState(null);
  const [modal, setModal] = useState(null);
  const [response, SetResponse] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [position, setPosition] = useState("center");
  const [position2, setPosition2] = useState("center");
  const [ticketForm, setTicketForm] = useState({
    title: "",
    problem: "",
    priority: "",
  });
  const { userId } = useParams();

  // ON RENDER
  useEffect(() => {
    const fetchAllTickets = () => {
      fetch(`http://localhost:3000/tickets/allTickets/${userId}`)
        .then((response) => response.json())
        .then((response) => {
          setTickets(response.data);
        });
    };

    fetchAllTickets();
  }, []);

  // ON SUBMITION
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    fetch(`http://localhost:3000/tickets/create/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketForm),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        SetResponse(response.message);
        setTicketForm({
          title: "",
          problem: "",
          priority: "",
        });
        setTimeout(() => {
          SetResponse("");
          setVisible(false);
        }, 1500);
      });
  };

  // ONCHANGE INPUTS
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTicketForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // CANCEL BUTTON
  const handleCancel = () => {
    setTicketForm({
      title: "",
      problem: "",
      priority: "",
    });
    setVisible(false);
    setVisible2(false);
  };

  // MODAL VISIBILTY 1
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  // MODAL VISIBILTY 2
  const show2 = (position) => {
    setPosition2(position);
    setVisible2(true);
  };

  // ROW SELECTION TABLE
  const handleSelectRow = (event) => {
    setTicketDetail(event.value);
    show2("right");
    console.log("data", event.value);
  };

  return (
    <div
      id="mainContainer"
      className="flex flex-col justify-center items-center p-2 flex  h-screen"
    >
      <div className="">
        <Button
          label="Create Ticket"
          icon="pi pi-arrow-right"
          onClick={() => show("left")}
          className="p-button-help"
          style={{ minWidth: "10rem" }}
        />
      </div>
      <DataTable
        value={tickets}
        selectionMode="single"
        onSelectionChange={(e) => handleSelectRow(e)}
        tableStyle={{ minWidth: "100vw" }}
      >
        <Column
          field="ticketNumber"
          header="Ticket Number"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="title"
          header="Title"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="priority"
          header="Priority"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="creationDate"
          header="Date"
          sortable
          style={{ width: "25%" }}
        ></Column>
      </DataTable>

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
              <option value="high">HIGH</option>
              <option value="medium">MEDIUM</option>
              <option value="low">LOW</option>
              <option value="min">MINIMAL</option>
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

          <div
            id="Cancel&Submit"
            className="flex items-center gap-2 self-center "
          >
            <button
              onClick={handleCancel}
              className="cursor-pointer hover:bg-[#12ffa8] w-20 h-10 font-bold bg-[#97f0cf]  "
              type="button"
            >
              Cancel
            </button>

            <button
              className="cursor-pointer hover:bg-[#12ffa8] w-20 h-10 font-bold bg-[#97f0cf]  "
              type="submit"
            >
              Submit
            </button>
            <span className="font-bold text-green-400">{response}</span>
          </div>
        </form>
      </Dialog>

      <Dialog
        header={`Ticket Detail`}
        visible={visible2}
        position={position2}
        style={{ width: "50vw" }}
        onHide={() => setVisible2(false)}
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
      </Dialog>
    </div>
  );
}

export default LogPage;
