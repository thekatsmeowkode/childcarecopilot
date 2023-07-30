import {useState} from 'react'

const useForm = (formState) => {
    const [form, setForm] = useState(formState)

    const onChangeInput = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
        }
    
    return {
        form, onChangeInput, setForm
    }
}

export default useForm