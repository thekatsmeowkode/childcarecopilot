import { useState } from "react";

const useForm = (formState) => {
  const [form, setForm] = useState(formState);

  const onChangeInput = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
  };

  return {
    form,
    onChangeInput,
    setForm,
  };
};

export default useForm;
