import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../components/formElement/Input";
import InputTel from "../components/formElement/InputTel";
import { Form, Formik } from "formik";
import classNames from "classnames";
import OutlinedBaseBtn from "../components/buttons/OutlinedBaseBtn";
import ButtonBox from "../components/formElement/ButtonBox";
import { selectCurrentUser } from "../store/services/authSlice";
import TextArea from "../components/formElement/TextArea";
import {
  useAddUserMutation,
  useGetUsersMutation,
  useUpdateUserMutation,
} from "../store/services/mainApi";
import userImage from "../assets/logo/blank.png";
import { last } from "lodash";

export default function AddUsers() {
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);
  console.log(user.institution_id, "userxxxx");
  const [userInfo, setUserInfo] = useState({
    username: "",
    lastname: "",
    firstname: "",
    description: "",
    status: 1,
    role: "admin",
    id: "",
  });


  const [updateUser] = useUpdateUserMutation(id);
  const [addUser] = useAddUserMutation()


  
  return (
    <>
      <div className="flex flex-col items-center border rounded-lg shadow-md p-6 bg-white m-8 ">

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
                  <Input name="firstname" label="First Name" />
                  <Input name="lastname" label="Last Name" />
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Input name="username" label="User Name" />

                  <InputTel name="phone" label="Phone" />
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Input name="email" label="Email" />
                  <Input name="password" label="Password" />
                </div>
                <TextArea name="description" label="Description" />

                <div className="flex gap-4  flex-col md:flex-row ">
                  <div className="flex gap-4 mt-4 flex-col md:flex-row">
                    <h4 className="font-medium text-secondary">Status: </h4>
                    <div className="flex flex-col gap-2 xl:flex-row">
                      <ButtonBox small name="status" label="Active" value={1} />
                      <ButtonBox
                        small
                        name="status"
                        label="Inactive"
                        value={0}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4  flex-col md:flex-row">
                    <h4 className="font-medium text-secondary">Rol: </h4>
                    <div className="flex flex-col gap-2 xl:flex-row flex-wrap">
                      <ButtonBox small name="role" label="Admin" value="admin" />
                      <ButtonBox
                        small
                        name="role"
                        label="Süper Admin"
                        value="super_admin"
                      />
                      <ButtonBox
                        small
                        name="role"
                        label="Client"
                        value="client"
                      />
                      <ButtonBox
                        small
                        name="role"
                        label="Security"
                        value="security"
                      />
                    </div>
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
    </>
  );
}
