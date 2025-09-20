import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Row from "../shared/ui/Row/Row";
import Button from "../shared/ui/Button/Button";
import Heading from "../shared/ui/Heading/Heading";
import Modal from "../shared/ui/Modal/Modal";

function Cabins() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>

      <Row>
        <CabinTable />
        <Button size="large" onClick={() => setShowCreateForm((show) => !show)}>
          Add new cabin
        </Button>
        {showCreateForm && (
          <Modal onClose={() => setShowCreateForm(false)}>
            <CreateCabinForm setShowCreateForm={setShowCreateForm} />
          </Modal>
        )}
      </Row>
    </>
  );
}

export default Cabins;
