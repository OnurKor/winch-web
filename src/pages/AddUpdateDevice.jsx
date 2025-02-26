import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Input from "../components/formElement/Input";
import { Form, Formik } from "formik";
import OutlinedBaseBtn from "../components/buttons/OutlinedBaseBtn";
import {
    useAddDeviceMutation,
  useGetSingleDeviceQuery,
  useUpdateUserMutation,
} from "../store/services/mainApi";
import { toastErrorNotify, toastSuccessNotify } from "../helper/Toastfy";
import { div } from "framer-motion/client";

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
  

  const [updateUser] = useUpdateUserMutation(id);
  const [addDevice] = useAddDeviceMutation();

  return (
    <div>
      <div className="flex flex-col items-center border rounded-lg shadow-md p-6 bg-white m-8 mt-4">
        <Formik
          enableReinitialize
          initialValues={deviceInfo}
          onSubmit={async (values, actions) => {
            console.log(values);

            try {
              if (id) {
                const updatedUser = await updateUser({
                  id: id, // Kullanıcının ID'si
                  body: values, // Güncellenecek kullanıcı verisi
                }).unwrap(); // unwrap ile hata fırlatmalarını yakalayabilirsiniz
                console.log("User updated successfully", updatedUser);
                if(updatedUser.success){
                  toastSuccessNotify("Kullanıcı başarıyla güncellendi")
                navigate("/devices_list")
                }else{
                  toastErrorNotify("Kullanıcı güncellenirken bir hata oluştu")
                }
              } else {
                const addDeviceResponse = await addDevice({
                  body: {
                    ...values,
                  },
                }).unwrap();
                
                if(addDeviceResponse.success){
                  toastSuccessNotify("Cihaz başarıyla eklendi")
                
                  navigate("/devices_list")
                }else{
                  toastErrorNotify("Cihaz eklenirken bir hata oluştu")
                }
              }
            } catch (error) {
              console.error("Error updating user", error);
              toastErrorNotify(error.data.message)
            }
          }}
        >
          {({ handleSubmit, values, setFieldValue, validateForm }) => (
            <Form onSubmit={handleSubmit} className=" w-full">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <Input name="mac_address" label="Mac Adres" />
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
      { id &&  
      <div className="flex flex-col border rounded-lg shadow-md p-6 bg-white m-8 mt-4">
          <div className="font-bold text-lg text-center">
            Cihaz Sahibi
          </div>
          <div className="flex flex-col gap-2">
            <p><strong>Adı Soyadı:</strong> {deviceDetail?.content?.owner?.name} {deviceDetail?.content?.owner?.surname}</p> 
            <p><strong>Email Adresi:</strong> {deviceDetail?.content?.owner?.email} </p> 
            <p><strong>Telefon Numarası:</strong> {deviceDetail?.content?.owner?.phone}</p> 
          </div>
          <div className="flex justify-end mt-6">
                <OutlinedBaseBtn
                  title="Cihaz Sahibini Kaldır"
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                />
            </div>
      </div>}
    </div>
  );
}
