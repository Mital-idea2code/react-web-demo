import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

export default function Teams() {
  const [datatabledata, setdatatabledata] = useState([]);

  useEffect(() => {
    // list();
  }, []);

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "position",
      label: "Position",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "_id",
      label: "Action",
      options: {
        filter: true,
        sort: false,
        empty: true,
      },
    },
  ];

  const options = {};

  return (
    <div>
      {/* <PageTitle
        title="Services"
        button={
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              props.history.push("/app/services/manage");
            }}
          >
            Add Service
          </Button>
        }
      /> */}
      <MUIDataTable
        title={"Team List"}
        data={datatabledata}
        columns={columns}
        options={options}
      />
    </div>
  );
}
