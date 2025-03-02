import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Input from "../components/formElement/Input";
import { Form, Formik } from "formik";
import OutlinedBaseBtn from "../components/buttons/OutlinedBaseBtn";
import {
  useAddDeviceMutation,
  useGetSingleDeviceQuery,
  useUpdateUserMutation,
  useUpdateDeviceMutation,
  useRemoveUserMutation,
  useRemoveOwnerMutation,
} from "../store/services/mainApi";
import { toastErrorNotify, toastSuccessNotify } from "../helper/Toastfy";
import { div } from "framer-motion/client";
import PageWrapper from "../components/PageWrapper";
import Table, { StatusPill } from "../components/table/NewTables";
import TableButton from "../components/table/TableButton";

export default function AddUpdateDevice() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || 0;

  console.log(id, "id");

  const { data: deviceDetail } = useGetSingleDeviceQuery(id, {
    skip: !id || id === "null",
  });

  console.log(deviceDetail, "deviceDetail");

  const [deviceInfo, setDeviceInfo] = useState({
    mac_address: "",
    plate: "",
  });

  useEffect(() => {
    if (deviceDetail) {
      setDeviceInfo({
        mac_address: deviceDetail.content?.mac_address || "",
        plate: deviceDetail.content?.plate || "",
      });
    }
  }, [deviceDetail]);

  const [updateDevice] = useUpdateDeviceMutation(id);
  const [addDevice] = useAddDeviceMutation();
  const [removeUser] = useRemoveUserMutation();

  const deleteFunc = async (userId) => {
    try {
      await removeUser({ deviceId: id, userId }).unwrap();
      toastSuccessNotify("Kullanıcı başarıyla silindi.");
    } catch (error) {
      console.error("Kullanıcı silme hatası:", error);
      toastErrorNotify("Kullanıcı silinirken bir hata oluştu.");
    }
  };

  const [removeOwner] = useRemoveOwnerMutation();

const handleRemoveOwner = async () => {
  try {
    const body = {
      mac_address: deviceInfo.mac_address, // Mevcut cihaz bilgisi
      plate: deviceInfo.plate, // Mevcut plaka bilgisi
    };

    await removeOwner({ deviceId: id, body }).unwrap();
    toastSuccessNotify("Cihaz sahibi başarıyla kaldırıldı.");
  } catch (error) {
    console.error("Cihaz sahibi kaldırma hatası:", error);
    toastErrorNotify("Cihaz sahibi kaldırılırken bir hata oluştu.");
  }
};

  
  const columns = useMemo(
    () => [
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => <TableButton row={row} deleteFunc={deleteFunc} />,
      },
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Surname",
        accessor: "surname",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
    ],
    []
  );
  

  return (
    <div>
      <div className="flex flex-col items-center border rounded-lg shadow-md p-6 xl:px-24 xxl:px-36 bg-white m-2 md:mx-6 lg:mx-8 xl:mx-16 xxl:mx-32">
        <div className="font-bold text-lg text-center mb-5">
          Cihaz Bilgileri
        </div>
        <Formik
          enableReinitialize
          initialValues={deviceInfo}
          onSubmit={async (values, actions) => {
            console.log(values);

            try {
              if (id) {
                const updateDeviceResponse = await updateDevice({
                  id: id, // Kullanıcının ID'si
                  body: values, // Güncellenecek kullanıcı verisi
                }).unwrap(); // unwrap ile hata fırlatmalarını yakalayabilirsiniz
                console.log("User updated successfully", updateDevice);
                if (updateDeviceResponse.success) {
                  toastSuccessNotify("Plaka başarıyla güncellendi");
                  navigate("/devices_list");
                } else {
                  toastErrorNotify("Plaka güncellenirken bir hata oluştu");
                }
              } else {
                const addDeviceResponse = await addDevice({
                  body: {
                    ...values,
                  },
                }).unwrap();

                if (addDeviceResponse.success) {
                  toastSuccessNotify("Cihaz başarıyla eklendi");

                  navigate("/devices_list");
                } else {
                  toastErrorNotify("Cihaz eklenirken bir hata oluştu");
                }
              }
            } catch (error) {
              console.error("Error updating user", error);
              toastErrorNotify(error.data.message);
            }
          }}
        >
          {({ handleSubmit, values, setFieldValue, validateForm }) => (
            <Form onSubmit={handleSubmit} className=" w-full">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <Input name="mac_address" label="Mac Adres" disabled={Boolean(id)}/>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  <Input name="plate" label="Plaka" />
                </div>
              </div>

              {/* Alt Butonlar */}
              <div className="flex justify-end mt-6">
                <OutlinedBaseBtn
                  title={id ? "Güncelle" : "Kaydet"}
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {id && (
        <>
          <div className="flex flex-col border rounded-lg shadow-md p-6 xl:px-24 xxl:px-36 bg-white m-2 md:mx-6 lg:mx-8 xl:mx-16 xxl:mx-32">
            <div className="font-bold text-lg text-center mb-5">
              Cihaz Sahibi
            </div>
            <div className="flex flex-col xl:flex-row justify-around gap-2">
              <div className="flex flex-col gap-2">
                <p>
                  <strong>Adı Soyadı:</strong>{" "}
                  {deviceDetail?.content?.owner?.name}{" "}
                  {deviceDetail?.content?.owner?.surname}
                </p>
                <p>
                  <strong>Id:</strong> {deviceDetail?.content?.owner?.id}{" "}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  <strong>Email Adresi:</strong>{" "}
                  {deviceDetail?.content?.owner?.email}{" "}
                </p>
                <p>
                  <strong>Telefon Numarası:</strong>{" "}
                  {deviceDetail?.content?.owner?.phone}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <OutlinedBaseBtn
                title="Cihaz Sahibini Kaldır"
                type="button"
                onClick={handleRemoveOwner} // API çağrısını burada yapıyoruz
                className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col border rounded-lg shadow-md py-4 bg-white m-2 md:m-6 lg:mx-8 xl:m-16 xxl:mx-32">
            <div className="font-bold text-lg text-center mb-5">
              Kullanıcı Bilgileri
            </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
            <PageWrapper>
              <div className="w-full">
                {
                  <Table
                    columns={columns}
                    data={[...(deviceDetail?.content?.users || [])]}
                  />
                }
              </div>
            </PageWrapper>
          </div>
        </>
      )}
    </div>
  );
}
