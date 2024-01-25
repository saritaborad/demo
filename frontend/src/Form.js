// components/Form.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createForm, submitForm } from "../actions/formActions";

const Form = () => {
 const dispatch = useDispatch();
 const { form, submittedAnswers } = useSelector((state) => state);

 const [formFields, setFormFields] = useState([{ label: "", type: "text", required: false }]);

 const handleAddField = () => {
  setFormFields([...formFields, { label: "", type: "text", required: false }]);
 };

 const handleInputChange = (index, key, value) => {
  const updatedFields = [...formFields];
  updatedFields[index][key] = value;
  setFormFields(updatedFields);
 };

 const handleCreateForm = () => {
  dispatch(createForm(formFields));
 };

 const handleSubmission = () => {
  // For simplicity, use the first form in the state.
  const formId = form._id;
  const answers = formFields.reduce(
   (acc, field) => ({ ...acc, [field.label]: "" }), // Initialize answers with empty strings
   {}
  );
  dispatch(submitForm(formId, answers));
 };

 return (
  <div>
   {formFields.map((field, index) => (
    <div key={index}>
     <label>
      Label:
      <input type="text" value={field.label} onChange={(e) => handleInputChange(index, "label", e.target.value)} />
     </label>
     <label>
      Type:
      <select value={field.type} onChange={(e) => handleInputChange(index, "type", e.target.value)}>
       <option value="text">Text</option>
       <option value="radio">Radio</option>
       <option value="checkbox">Checkbox</option>
       <option value="dropdown">Dropdown</option>
      </select>
     </label>
     <label>
      Required:
      <input type="checkbox" checked={field.required} onChange={(e) => handleInputChange(index, "required", e.target.checked)} />
     </label>
    </div>
   ))}
   <button onClick={handleAddField}>Add Field</button>
   <button onClick={handleCreateForm}>Create Form</button>
   <button onClick={handleSubmission}>Submit</button>
  </div>
 );
};

export default Form;
