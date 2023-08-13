import React, { useState, useContext, useEffect } from "react";
import { PROGRAM_FIELDS, STUDENT_EMPTY_FIELDS } from "../../constants";
import { fetchData } from "../../hooks/useApi";
import useForm from "../../hooks/useForm";
import { ClassroomContext } from "../../context/ClassroomContext";
import MuiProgramField from "./MuiProgramFields";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

const StudentForm = ({ onClose, setSelectedStudents }) => {
  const {
    form,
    setForm,
    onChangeInput,
    handleProgramChange,
    handleSubmit,
    errors,
  } = useForm(STUDENT_EMPTY_FIELDS);

  const { dispatch } = useContext(ClassroomContext);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const student = { ...form };

    //this post response returns complete json of the updated classroom {_id:3423, roomName: infants, students:[{}{}]
    const response = await fetchData("/api/classes/students", "POST", student);

    setSelectedStudents(response.students);
    setForm(STUDENT_EMPTY_FIELDS);
    console.log(`new student added`);
    dispatch({ type: "ADD_STUDENT_TO_CLASSROOM", payload: response });

    onClose();
  };

  return (
    <ValidatorForm onSubmit={(e) => handleSubmit(e, handleAddStudent)}>
      <TextValidator
        label="Name"
        name="name"
        value={form.name}
        onChange={onChangeInput}
        required
        fullWidth
        margin="normal"
        validators={["required"]}
        errorsMessages={["Name is required"]}
      />

      <TextValidator
        label="Birthdate"
        type="date"
        name="birthdate"
        onChange={onChangeInput}
        value={form.birthdate}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        validators={['required']}
        errorMessages={["Birthdate is required"]}
      />

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Classroom</InputLabel>
        <Select
          name="classroomName"
          value={form.classroomName}
          onChange={onChangeInput}
          validators={["required"]}
          errorMessages={["Classroom is required"]}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="infants">Infants</MenuItem>
          <MenuItem value="crawlers">Crawlers</MenuItem>
          <MenuItem value="toddlers">Toddlers</MenuItem>
          <MenuItem value="twos">Twos</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Allergies"
        type="text"
        name="allergies"
        value={form.allergies}
        onChange={onChangeInput}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Phone Number"
        type="tel"
        name="phone"
        value={form.phone}
        onChange={onChangeInput}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        fullWidth
        margin="normal"
      />

      <FormGroup>
        {PROGRAM_FIELDS.map((program) => (
          <FormControlLabel
            key={program.label}
            control={
              <MuiProgramField
                checked={form.programs.includes(program.value)}
                value={program.value}
                handleProgramChange={handleProgramChange}
                form={form}
                label={program.label}
              />
            }
          />
        ))}
      </FormGroup>

      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </ValidatorForm>
  );
};

export default StudentForm;
