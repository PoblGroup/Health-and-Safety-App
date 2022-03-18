import React from 'react'
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({label, name, value, onChange}) => {
  return (
      <>
        <Form.Label>{label}</Form.Label>
        <DatePicker 
            className='form-control'
            dateFormat="dd/MM/yyyy"
            selected={( value && new Date(value) || null )}
            onChange={val => onChange(name, val)}
        />
    </>
  )
}

export default DatePickerField