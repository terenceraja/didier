import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

function HomePage() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
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
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </div>
  );
}

export default HomePage;
