"use client";
import { useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Slider,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const initialValues = {
    person: {
        firstname: "",
        lastname: "",
    },
    details: {
        age: "",
        contact: "",
        mail: "",
        address: "",
        dob: "",
        gender: "",
    },
    on: {
        rentsell: "",
    },

    type: {
        roomtype: [],
        roomdetails: "",
        price: "",
    },
};
interface IFormInput {
    person: {
        firstname?: string;
        lastname?: string;
    };
    details: {
        age?: string;
        contact?: string;
        mail?: string;
        address?: string;
        dob?: string;
        gender?: string;
    };
    on: {
        rentsell?: string;
    };

    type: {
        roomtype?: string[];
        roomdetails?: string;
        price?: string;
    };
}

const schema = yup.object().shape({
    person: yup.object().shape({
        firstname: yup
            .string()
            .matches(/^[A-Za-z ]*$/, "Please enter a valid firstname")
            .max(20)
            .required("FirstName is required"),
        lastname: yup
            .string()
            .matches(/^[A-Za-z ]*$/, "Please enter a valid lastname")
            .max(20)
            .required("LastName is required"),
    }),
    details: yup.object().shape({
        age: yup.string(),
        contact: yup.string(),
        // .matches(/^\d{10}$/, "enter valid number")
        // .required("Contact No. required"),
        mail: yup.string(),
        // .matches(
        //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        //     "Please enter a valid email"
        // )
        address: yup.string(),
        dob: yup.string(),
        gender: yup.string(),
    }),
    on: yup.object().shape({
        rentsell: yup.string(),
    }),
    type: yup.object().shape({
        roomtype: yup.array().of(yup.string()),
        roomdetails: yup.string(),
        price: yup.string(),
    }),
});
function RentForm() {
    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [formType, setformType] = useState("");
    const nextStep = () => {
        if (currentStep === 1) {
            const isStep1Valid =
                !errors?.person?.firstname && !errors?.person?.lastname;
            if (!isStep1Valid) {
                return;
            }
        } else if (currentStep === 2) {
            const isStep2Valid =
                !errors?.details?.age &&
                !errors?.details?.contact &&
                !errors?.details?.mail &&
                !errors?.details?.dob &&
                !errors?.details?.address &&
                !errors?.details?.gender;
            if (!isStep2Valid) {
                return;
            }
        } else if (currentStep === 3) {
            const isStep3Valid = !errors?.on?.rentsell;
            if (!isStep3Valid) {
                return;
            }
        } else if (currentStep === 4) {
            if (
                selectedRoomTypes.length === 0 ||
                !errors?.type?.roomdetails ||
                !errors?.type?.price
            ) {
                return;
            }
        }

        setCurrentStep(currentStep + 1);
    };

    const previousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const totalSteps = 4;
    const handleRoomTypeChange = (e: any) => {
        const { value } = e.target;
        if (selectedRoomTypes.includes(value)) {
            setSelectedRoomTypes(
                selectedRoomTypes.filter((roomType) => roomType !== value)
            );
        } else {
            setSelectedRoomTypes([...selectedRoomTypes, value]);
        }
    };
    const onSubmitHandler = (data: any) => {
        data.type.roomtype = selectedRoomTypes;
        data.on.rentsell = formType;
        console.log({ data });
        // setSelectedRoomTypes([]);
        // reset(initialValues);
    };
    return (
        <div className="main">
            <div style={{ width: "600px" }}>
                <h1>HOUSE RENT/SELL FORM</h1>
                <form
                    className="form"
                    onSubmit={handleSubmit(onSubmitHandler)}
                    style={{
                        display: "flex",
                        gap: "13px",
                        flexDirection: "column",
                    }}
                >
                    {currentStep === 1 && (
                        <>
                            <p>Buyer/Seller Name : </p>
                            <label> First Name </label>
                            <Controller
                                name="person.firstname"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        variant="filled"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        size="small"
                                    />
                                )}
                            />
                            <p>{errors.person?.firstname?.message}</p>

                            <label> Last Name </label>
                            <Controller
                                name="person.lastname"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        variant="filled"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        size="small"
                                    />
                                )}
                            />
                            <p>{errors.person?.lastname?.message}</p>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <p>Buyer/Seller Details : </p>

                            <label> Age</label>
                            <Controller
                                name="details.age"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        variant="filled"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        size="small"
                                    />
                                )}
                            />
                            <p>{errors.details?.age?.message}</p>

                            <label> Contact </label>
                            <Controller
                                name="details.mail"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        variant="filled"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        size="small"
                                    />
                                )}
                            />
                            <p>{errors.details?.contact?.message}</p>

                            <label> Email</label>
                            <Controller
                                name="details.contact"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        variant="filled"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        size="small"
                                    />
                                )}
                            />
                            <p>{errors.details?.mail?.message}</p>

                            <label> Date of Birth </label>
                            <Controller
                                name="details.dob"
                                control={control}
                                render={({ field }) => (
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DemoContainer
                                            components={["DatePicker"]}
                                        >
                                            <DatePicker
                                                label="Date of Birth"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                )}
                            />
                            <p>{errors.details?.dob?.message}</p>

                            <label> Address </label>
                            <Controller
                                name="details.address"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        variant="filled"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        size="small"
                                    />
                                )}
                            />
                            <p>{errors.details?.address?.message}</p>

                            <label> Gender</label>
                            <Controller
                                name="details.gender"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        variant="filled"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        size="small"
                                    />
                                )}
                            />
                            <p>{errors.details?.gender?.message}</p>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <p>Type:</p>

                            <label> Rent/Sale</label>
                            <Controller
                                name="on.rentsell"
                                control={control}
                                render={({ field }) => (
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            value={field.value}
                                            onChange={(e) =>
                                                setformType(e.target.value)
                                            }
                                        >
                                            <FormControlLabel
                                                value="Sale"
                                                control={<Radio />}
                                                label="Sale"
                                            />
                                            <FormControlLabel
                                                value="Rent"
                                                control={<Radio />}
                                                label="Rent"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                )}
                            />
                            <p>{errors.on?.rentsell?.message}</p>
                        </>
                    )}
                    {currentStep === 4 && formType == "Sale" ? (
                        <>
                            <p>Room Details for Sale :</p>

                            <label> Room Type </label>
                            <Controller
                                name="type.roomtype"
                                control={control}
                                // render={({ field }) => (
                                render={({
                                    field: { value, ref, ...field },
                                }) => (
                                    <>
                                        <FormControl component="fieldset">
                                            <FormGroup row>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            {...field}
                                                            inputRef={ref}
                                                            onChange={
                                                                handleRoomTypeChange
                                                            }
                                                            value="1bhk"
                                                        />
                                                    }
                                                    label="1bhk"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            {...field}
                                                            inputRef={ref}
                                                            onChange={
                                                                handleRoomTypeChange
                                                            }
                                                            value="2bhk"
                                                        />
                                                    }
                                                    label="2bhk"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            {...field}
                                                            inputRef={ref}
                                                            onChange={
                                                                handleRoomTypeChange
                                                            }
                                                            value="3bhk"
                                                        />
                                                    }
                                                    label="3bhk"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </>
                                )}
                            />
                            <p>{errors.type?.roomtype?.message}</p>

                            <label> Room Details </label>
                            <Controller
                                name="type.roomdetails"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <FormControl fullWidth>
                                            <Select
                                                {...field}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={age}
                                                // label="Age"
                                                // onChange={handleChange}
                                            >
                                                <MenuItem value={10}>
                                                    Semi-furnished
                                                </MenuItem>
                                                <MenuItem value={20}>
                                                    Furnished
                                                </MenuItem>
                                                <MenuItem value={30}>
                                                    Un-furnished
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </>
                                )}
                            />
                            <p>{errors.type?.roomdetails?.message}</p>

                            <label> Price </label>
                            <Controller
                                name="type.price"
                                control={control}
                                render={({ field }) => (
                                    <Slider
                                        {...field}
                                        aria-label="Price"
                                        defaultValue={30}
                                        valueLabelDisplay="auto"
                                        marks
                                        min={0}
                                        max={1000}
                                    />
                                )}
                            />
                            <p>{errors.type?.price?.message}</p>

                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </>
                    ) : currentStep === 4 && formType == "Rent" ? (
                        <>
                            <p>Room Details for Rent :</p>

                            <label> Room Type </label>
                            <Controller
                                name="type.roomtype"
                                control={control}
                                // render={({ field }) => (
                                render={({
                                    field: { value, ref, ...field },
                                }) => (
                                    <>
                                        <FormControl component="fieldset">
                                            <FormGroup row>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            {...field}
                                                            inputRef={ref}
                                                            onChange={
                                                                handleRoomTypeChange
                                                            }
                                                            value="1bhk"
                                                        />
                                                    }
                                                    label="1bhk"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            {...field}
                                                            inputRef={ref}
                                                            onChange={
                                                                handleRoomTypeChange
                                                            }
                                                            value="2bhk"
                                                        />
                                                    }
                                                    label="2bhk"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            {...field}
                                                            inputRef={ref}
                                                            onChange={
                                                                handleRoomTypeChange
                                                            }
                                                            value="3bhk"
                                                        />
                                                    }
                                                    label="3bhk"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </>
                                )}
                            />
                            <p>{errors.type?.roomtype?.message}</p>

                            <label> Room Details </label>
                            <Controller
                                name="type.roomdetails"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <FormControl fullWidth>
                                            <Select
                                                {...field}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                <MenuItem value={10}>
                                                    Semi-furnished
                                                </MenuItem>
                                                <MenuItem value={20}>
                                                    Furnished
                                                </MenuItem>
                                                <MenuItem value={30}>
                                                    Un-furnished
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </>
                                )}
                            />
                            <p>{errors.type?.roomdetails?.message}</p>

                            <label> Price </label>
                            <Controller
                                name="type.price"
                                control={control}
                                render={({ field }) => (
                                    <Slider
                                        {...field}
                                        aria-label="Price"
                                        defaultValue={30}
                                        valueLabelDisplay="auto"
                                        marks
                                        min={0}
                                        max={1000}
                                        // component="span"
                                        // value={0}
                                    />
                                )}
                            />
                            <p>{errors.type?.price?.message}</p>

                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </>
                    ) : (
                        ""
                    )}
                </form>
                {currentStep < totalSteps && (
                    <button onClick={handleSubmit(nextStep)}>Next</button>
                )}
                {currentStep > 1 && (
                    <button onClick={previousStep}>Previous</button>
                )}
            </div>
        </div>
    );
}

export default RentForm;
