import React from "react";
import { useState } from "react";

import styles from "./CabinRow.module.css";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import Button from "../../shared/ui/Button/Button";
import Table from "../../shared/ui/Table/Table";

export interface Cabin {
  _id: string;
  cabinName: string;
  cabinImage: string;
  maxCapacity: number;
  price: number;
  discount: number;
}

interface CabinRowProps {
  cabin: Cabin;
}

function CabinRow({ cabin }: CabinRowProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const {
    _id: cabinId,
    cabinName,
    cabinImage,
    maxCapacity,
    price,
    discount,
  } = cabin;

  return (
    <>
      <Table.Row>
        <img
          className={styles.img}
          src={cabinImage || `/cabins/cabin-${cabinName}.jpg`}
          alt={`Image of the cabin ${cabinName}`}
        />
        <div className={styles.cabin}>{cabinName}</div>
        <div className={styles.capacity}>Fits Up To {maxCapacity}</div>
        <div className={styles.price}>{price}</div>
        {discount ? (
          <div className={styles.discount}>{discount}</div>
        ) : (
          <span>&mdash;</span>
        )}

        <div className="flex gap-2 md:gap-4">
          <Button
            variation="secondary"
            size="small"
            onClick={() => setShowEditForm((show) => !show)}
          >
            Edit
          </Button>
          <Button
            variation="danger"
            size="small"
            onClick={() => deleteCabin(cabinId)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </div>
      </Table.Row>
      {showEditForm && (
        <CreateCabinForm
          cabinToEdit={cabin}
          setShowEditForm={setShowEditForm}
        />
      )}
    </>
  );
}

export default CabinRow;
