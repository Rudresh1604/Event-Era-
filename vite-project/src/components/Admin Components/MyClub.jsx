import React from "react";
import ClubDataTable from "./ClubDataTable.jsx";

function EventDisplay({ event }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ClubDataTable />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default EventDisplay;
