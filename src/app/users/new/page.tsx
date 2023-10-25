"use client";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//data --> sheets
const initialValues = {
    name: "",
    age: "",
    gender: "",
    salary: "",
};

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    gender: yup.string().required("Gender is required"),
    age: yup.number().required("Age is required"),
    salary: yup.number().required("Salary is required"),
});

function NewUsersPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const onSubmitHandler = (data: any) => {
        axios
            .post(
                "https://sheet.best/api/sheets/8ff1d2a2-f899-4201-b1ee-2df7df1c272a",
                data
            )
            .then((response) => {
                console.log("response", response);
                if (response.status === 200) {
                    reset();
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="main">
            <div style={{ width: "430px" }}>
                <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
                    <label> Name </label>
                    <br />
                    <input
                        {...register("name")}
                        placeholder="Name"
                        type="text"
                        onChange={handleInputChange}
                    />
                    <p>{errors.name?.message}</p>
                    <br />

                    <label> Age </label>
                    <br />
                    <input
                        {...register("age")}
                        placeholder="Age"
                        type="number"
                        onChange={handleInputChange}
                    />
                    <p>{errors.age?.message}</p>
                    <br />

                    <label> Gender </label>
                    <br />
                    <input
                        {...register("gender")}
                        placeholder="Gender"
                        type="text"
                        onChange={handleInputChange}
                    />
                    <p>{errors.gender?.message}</p>
                    <br />

                    <label> Salary </label>
                    <br />
                    <input
                        {...register("salary")}
                        placeholder="Salary"
                        type="number"
                        onChange={handleInputChange}
                    />
                    <p>{errors.salary?.message}</p>
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default NewUsersPage;
