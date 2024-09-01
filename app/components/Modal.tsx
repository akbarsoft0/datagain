import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import AddEvent from "./AddEvent";

type ModalProps = {
  open: boolean;
  handleOpen: () => void;
  day: Date | null;
};

export const Modal: React.FC<ModalProps> = ({ open, handleOpen, day }) => {
  return (
    <Dialog
      className="w-[50%] mw-[250px] m-auto"
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Add Event on {day && day.toDateString()}</DialogHeader>
      <DialogBody>
        <AddEvent day={day} handleOpen={handleOpen} />
      </DialogBody>
    </Dialog>
  );
};
