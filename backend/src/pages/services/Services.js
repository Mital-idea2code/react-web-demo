import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import MUIDataTable from "mui-datatables";
import { Button, List } from "@material-ui/core";
import { listService, deleteService, multipleService } from "../../apiServices";
import * as Icons from "@material-ui/icons";
import { toast } from "react-toastify";
import swal from "sweetalert";

export default function Services(props) {
  const [datatabledata, setdatatabledata] = useState([]);
  const list = () => {
    listService()
      .then((response) => {
        console.log("Sdfsdf");
        setdatatabledata(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    list();
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
      name: "sub_title",
      label: "Sort Description",
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Icons.Edit
                className="editBtn"
                onClick={() => {
                  const editData = datatabledata.find(
                    (data) => data._id === value,
                  );
                  props.history.push({
                    pathname: "/app/services/manage",
                    state: { editdata: editData },
                  });
                }}
              />
              <Icons.Delete
                className="deleteBtn"
                onClick={async () => {
                  const confirm = await swal({
                    title: "Are you sure?",
                    text: "Are you sure that you want to delete this file?",
                    icon: "warning",
                    dangerMode: true,
                  });
                  if (confirm) {
                    deleteService(value)
                      .then(() => {
                        toast.success("deleted successfully!", {
                          key: value,
                        });
                        list();
                      })
                      .catch((err) => {
                        toast.error("something went wrong!", {
                          key: value,
                        });
                      });
                  }
                }}
              />
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    onRowsDelete: async (index) => {
      const ids = index.data.map(
        (index1) =>
          datatabledata.find(
            (data, index2) => index2 === index1.dataIndex && data._id,
          )._id,
      );
      console.log(ids);
      const confirm = await swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this file?",
        icon: "warning",
        dangerMode: true,
      });

      if (confirm) {
        multipleService(ids)
          .then(() => {
            toast.success("deleted successfully!", {
              key: ids,
            });
            list();
          })
          .catch((err) => {
            toast.error("something went wrong!", {
              key: ids,
            });
          });
      }
    },
  };

  return (
    <div>
      <PageTitle
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
      />
      <MUIDataTable
        title={"Service List"}
        data={datatabledata}
        columns={columns}
        options={options}
      />
    </div>
  );
}
