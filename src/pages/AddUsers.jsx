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
    step: 1,
    username: "",
    lastname: "",
    firstname: "",
    description: "",
    status: 1,
    role: "admin",
    id: "",
  });

  // const {
  //   data: isUser,
  //   error,
  //   isLoading: isUserLoading,
  // } = useGetUserQuery(id, {
  //   skip: !id, // `id` yoksa API çağrısını atlar
  // });

  const [updateUser] = useUpdateUserMutation(id);
  const [addUser] = useAddUserMutation();

  // useEffect(() => {
  //   if (isUser?.ret) {
  //     const { username, lastname, firstname, description, status, role, id } =
  //       isUser.ret;

  //     setUserInfo({
  //       step: 1,
  //       username: username || "",
  //       lastname: lastname || "",
  //       firstname: firstname || "",
  //       description: description || "",
  //       status: status || 1,
  //       role: role || "admin",
  //       id: id || "",
  //     });
  //   }
  // }, [isUser]);

  const [profileImage, setProfileImage] = useState(userImage);

  const [hover, setHover] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center border rounded-lg shadow-md p-6 bg-white m-8 ">
        <div
          className="relative w-24 h-24 rounded-full border-4 border-lightkozy overflow-hidden group transition-transform duration-300 ease-in-out mb-6"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Profil Resmi */}
          <img
            src={profileImage}
            alt="User profile"
            className="w-full h-full object-cover"
          />

          {/* Hover Efekti */}

          {hover && (
            <div className="absolute bottom-[-100%] left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center  group-hover:bottom-0 z-10">
              <label
                htmlFor="file-input"
                className="text-white text-sm font-medium cursor-pointer hover:underline"
              >
                Change
              </label>
            </div>
          )}

          {/* Dosya Yükleme */}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <Formik
          enableReinitialize
          initialValues={userInfo}
          onSubmit={async (values, actions) => {
            console.log(values);
            const { step, lastStep, ...filteredValues } = values;

            try {
              if (id) {
                const updatedUser = await updateUser({
                  id: id, // Kullanıcının ID'si
                  body: filteredValues, // Güncellenecek kullanıcı verisi
                }).unwrap(); // unwrap ile hata fırlatmalarını yakalayabilirsiniz
                console.log("User updated successfully", updatedUser);
              } else {
                console.log({
                  institution_id: user.institution_id,
                  ...filteredValues,
                });
                const addUserResponse = await addUser({
                  body: {
                    institution_id: user.institution_id,
                    ...filteredValues,
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
