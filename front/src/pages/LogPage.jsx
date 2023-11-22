import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

import TicketCard from "../components/TicketCard";

function LogPage() {
  const [tickets, setTickets] = useState(null);
  const [disabledToggle, setDisabledToggle] = useState(true);
  console.log(disabledToggle);

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
  const [ticketForm2, setTicketForm2] = useState({
    title: "",
    priority: "",
    status: "",
    ticketNumber: "",
  });
  console.log("YOLO", ticketForm2);

  const [statuses] = useState(["open", "inProgress", "closed"]);
  const [priorities] = useState(["critical", "high", "medium", "low", "min"]);

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

  // ON SUBMITION FOR CREATE
  const handleSubmit = (e) => {
    e.preventDefault();

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

  // ON SUBMITION FOR UPDATE
  const handleSubmit2 = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/tickets/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: ticketForm2.title,
        ticketNumber: ticketForm2.ticketNumber,
        priority: ticketForm2.priority,
        status: ticketForm2.status,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // SetResponse(response.message);
        // setTicketForm({
        //   title: "",
        //   problem: "",
        //   priority: "",
        // });
        // setTimeout(() => {
        //   SetResponse("");
        //   setVisible(false);
        // }, 1500);
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

  const handleOnChange2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTicketForm2((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // CANCEL BUTTON
  const handleCancel = () => {
    setTicketForm({
      title: "",
      problem: "",
      priority: "",
      status: "",
    });
    setDisabledToggle(true);
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

  // ON HIDE MODEL

  const handleHide = () => {
    setTicketForm({
      title: "",
      problem: "",
      priority: "",
      status: "",
    });
    setDisabledToggle(true);
    setVisible(false);
    setVisible2(false);
  };

  // ROW SELECTION TABLE
  const handleSelectRow = (event) => {
    setTicketForm2(event.value);
    show2("right");
  };

  //  STATUS FILTER
  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        onChange={(e) => options.filterApplyCallback(e.value)}
        style={{ minWidth: "12rem" }}
      />
    );
  };

  //  PRIORITY FILTER
  const priorityRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={priorities}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        onChange={(e) => options.filterApplyCallback(e.value)}
        style={{ minWidth: "12rem" }}
      />
    );
  };

  // DATE FORMAT
  const formatDate = (value) => {
    const date = new Date(value);

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.creationDate);
  };

  const handleEdit = (e) => {
    if (disabledToggle) {
      e.preventDefault();
      setDisabledToggle((prev) => !prev);
    }
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
        filterDisplay="row"
      >
        <Column
          field="ticketNumber"
          header="Ticket Number"
          style={{ width: "5%" }}
        ></Column>
        <Column
          field="title"
          header="Title"
          sortable
          style={{ width: "5%" }}
        ></Column>
        <Column
          field="priority"
          header="Priority"
          sortable
          filter
          showFilterMenu={false}
          filterElement={priorityRowFilterTemplate}
          style={{ width: "5%" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          sortable
          filter
          showFilterMenu={false}
          filterElement={statusRowFilterTemplate}
          style={{ width: "5%" }}
        ></Column>
        <Column
          field="creationDate"
          header="Date"
          sortable
          style={{ width: "5%" }}
          body={dateBodyTemplate}
        ></Column>
      </DataTable>

      <Dialog
        header="Create Ticket"
        visible={visible}
        position={position}
        style={{ width: "50vw" }}
        onHide={handleHide}
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
            />
          </div>

          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Problem</label>
            <textarea
              className="p-2"
              onChange={handleOnChange}
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
        onHide={handleHide}
        draggable={false}
        resizable={false}
      >
        <form className="flex flex-col gap-5" onSubmit={handleSubmit2}>
          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Title</label>
            <input
              value={ticketForm2.title}
              readOnly
              className="h-10 p-5"
              type="text"
              name="title"
            />
          </div>

          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Problem</label>
            <textarea
              readOnly
              className="p-2"
              value={ticketForm2.problem}
              name="problem"
              rows="5"
              cols="33"
            >
              Describe the problem
            </textarea>
          </div>

          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Priority</label>
            <select
              disabled={disabledToggle}
              required
              onChange={handleOnChange2}
              name="priority"
              className="p-2 font-bold"
              value={ticketForm2.priority}
            >
              <option value="critical">CRITICAL</option>
              <option value="high">HIGH</option>
              <option value="medium">MEDIUM</option>
              <option value="low">LOW</option>
              <option value="min">MINIMAL</option>
            </select>
          </div>

          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Status</label>
            <select
              required
              disabled={disabledToggle}
              value={ticketForm2.status}
              onChange={handleOnChange2}
              name="status"
              className="p-2 font-bold "
            >
              <option value="open">OPEN</option>
              <option value="progress">IN PROGRESS</option>
              <option value="closed">CLOSED</option>
            </select>

            <div
              id="Cancel&Submit"
              className="flex items-center gap-2 self-center "
            >
              <button
                className="cursor-pointer hover:bg-[#12ffa8] w-25 h-10 font-bold bg-[#97f0cf]  "
                type={disabledToggle ? "button" : "submit"}
                onClick={(e) => handleEdit(e)}
              >
                {disabledToggle ? "EDIT" : "CONFIRM & SUBMIT ?"}
              </button>
              <button
                className="cursor-pointer hover:bg-[#12ffa8] w-20 h-10 font-bold bg-[#97f0cf]  "
                type="button"
                onClick={handleCancel}
              >
                CANCEL
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default LogPage;
