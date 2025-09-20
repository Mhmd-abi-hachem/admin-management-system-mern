import React from "react";

import Spinner from "../../shared/ui/Spinners/Spinner";
import CabinRow from "./CabinRow";
import { useAllCabins } from "./useAllCabins";
import Table from "../../shared/ui/Table/Table";

interface Cabin {
  _id: string;
  cabinName: string;
  cabinImage: string;
  maxCapacity: number;
  price: number;
  discount: number;
}

interface UseAllCabinsReturn {
  isLoadingCabins: boolean;
  getCabins: Cabin[] | undefined;
}

function CabinTable() {
  const { isLoadingCabins, getCabins }: UseAllCabinsReturn = useAllCabins();

  if (isLoadingCabins) return <Spinner />;

  if (!getCabins) {
    return <div>No cabins to display.</div>;
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={getCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin._id} />}
      />
    </Table>
  );
}

export default CabinTable;
