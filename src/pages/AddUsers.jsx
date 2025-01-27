import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Input from "../components/formElement/Input";
import InputTel from "../components/formElement/InputTel";
import { Form, Formik } from "formik";
import OutlinedBaseBtn from "../components/buttons/OutlinedBaseBtn";
import {
  useAddUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../store/services/mainApi";

export default function AddUsers() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || null; // Eğer "id" yoksa null ata

  console.log(id, "id");

  const { data: userDetail } = useGetSingleUserQuery(id, {
    skip: !id || id === "null",
  });
  
  console.log(userDetail, "userDetail");
  
  const [userInfo, setUserInfo] = useState({
    password: "",
    email: "",
    name: "",
    surname: "",
    phone: null,
  });
  
  useEffect(() => {
    if (userDetail) {
      setUserInfo({
        password: userDetail.content?.password || "",
        email: userDetail.content?.email || "",
        name: userDetail.content?.name || "",
        surname: userDetail.content?.surname || "",
        phone: userDetail.content?.phone || null,
      });
    }
  }, [userDetail]);
  

  const [updateUser] = useUpdateUserMutation(id);
  const [addUser] = useAddUserMutation();

  return (
      <div className="flex flex-col items-center border rounded-lg shadow-md p-6 bg-white m-8 mt-40">
        <Formik
          enableReinitialize
          initialValues={userInfo}
          onSubmit={async (values, actions) => {
            console.log(values);

            try {
              if (id) {
                const updatedUser = await updateUser({
                  id: id, // Kullanıcının ID'si
                  body: values, // Güncellenecek kullanıcı verisi
                }).unwrap(); // unwrap ile hata fırlatmalarını yakalayabilirsiniz
                console.log("User updated successfully", updatedUser);
              } else {
                const addUserResponse = await addUser({
                  body: {
                    ...values,
                  },
                }).unwrap();
                console.log("User added successfully", addUserResponse);
              }
            } catch (error) {
              console.error("Error updating user", error);
            }
          }}
        >
          {({ handleSubmit, values, setFieldValue, validateForm }) => (
            <Form onSubmit={handleSubmit} className=" w-full">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <Input name="name" label="Ad " />
                  <Input name="surname" label="Soyad" />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  <Input name="email" label="Email" />
                  <Input name="password" label="Parola Belirleyiniz..." />
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <InputTel name="phone" label="Phone" />
                  
                  <div className="invisible w-full" >
                    <Input name="hidden" label=""/>
                  </div>
                </div>
              </div>

              {/* Alt Butonlar */}
              <div className="flex justify-end mt-6">
                <OutlinedBaseBtn
                  title={id ? "Update User" : "Save"}
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

  );
}
