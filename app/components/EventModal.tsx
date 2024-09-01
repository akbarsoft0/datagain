import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddEvent from "./AddEvent";
const EventModal = ({ handleClose,open, selectedDay }:any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <button className="w-6 h-6 absolute top-3 right-3 flex justify-center items-center bg-blue-gray-50 text-gray-400 rounded-full"
        onClick={handleClose}
        >x</button>
      <AddEvent day={selectedDay} handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default EventModal;
