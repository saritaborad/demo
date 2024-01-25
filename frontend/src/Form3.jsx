// ... (previous frontend code)

import { useEffect, useState } from "react";

const Form = () => {
 // ... (previous code)

 const [forms, setForms] = useState([]);
 const [selectedForm, setSelectedForm] = useState(null);
 const [userAnswers, setUserAnswers] = useState([]);

 // Fetch forms from the server
 useEffect(() => {
   const fetchForms = async () => {
     try {
       const response = await fetch('http://localhost:5000/api/forms');
       const formsData = await response.json();
       setForms(formsData);
     } catch (error) {
       console.error('Error fetching forms:', error);
     }
   };

   fetchForms();
 }, []);

  const handleAnswerChange =()=>{}
 // Select a form to answer
 const handleFormSelect = (formId) => {
   const selected = forms.find((form) => form._id === formId);
   setSelectedForm(selected);
   setUserAnswers([]);
 };

 // Submit answers
 const handleSubmit = async () => {
   try {
     const response = await fetch('http://localhost:5000/api/submit', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ formId: selectedForm._id, answers: userAnswers }),
     });
     const result = await response.json();
     if (result.success) {
       alert('Answers submitted successfully!');
     } else {
       alert('Failed to submit answers.');
     }
   } catch (error) {
     console.error('Error submitting answers:', error);
   }
  };
  const handleCheckboxChange = ()=>{}

 // ... (previous code)

 return (
   <div>
     {/* ... (previous code) */}

     <h2>Available Forms</h2>
     <ul>
       {forms.map((form) => (
         <li key={form._id} onClick={() => handleFormSelect(form._id)}>
           {form.fields.map((field, index) => (
             <div key={index}>
               {field.label} - {field.type}
             </div>
           ))}
         </li>
       ))}
     </ul>

     {selectedForm && (
       <div>
         <h2>Submit Answers for {selectedForm._id}</h2>
         {selectedForm.fields.map((field, index) => (
           <div key={index}>
             <label>
               {field.label} 
               {field.required && ' (*)'}
             </label>
             {/* Add appropriate input components based on field.type */}
             {field.type === 'text' && (
               <input
                 type="text"
                 value={userAnswers[index] || ''}
                 onChange={(e) => handleAnswerChange(index, e.target.value)}
               />
             )}
             {field.type === 'radio' && (
               <div>
                 {field.options.map((option, optionIndex) => (
                   <label key={optionIndex}>
                     <input
                       type="radio"
                       value={option}
                       checked={userAnswers[index] === option}
                       onChange={() => handleAnswerChange(index, option)}
                     />
                     {option}
                   </label>
                 ))}
               </div>
             )}
             {field.type === 'checkbox' && (
               <div>
                 {field.options.map((option, optionIndex) => (
                   <label key={optionIndex}>
                     <input
                       type="checkbox"
                       value={option}
                       checked={userAnswers[index]?.includes(option) || false}
                       onChange={() => handleCheckboxChange(index, option)}
                     />
                     {option}
                   </label>
                 ))}
               </div>
             )}
             {field.type === 'dropdown' && (
               <select
                 value={userAnswers[index] || ''}
                 onChange={(e) => handleAnswerChange(index, e.target.value)}
               >
                 <option value="">Select an option</option>
                 {field.options.map((option, optionIndex) => (
                   <option key={optionIndex} value={option}>
                     {option}
                   </option>
                 ))}
               </select>
             )}
           </div>
         ))}
         <button type="button" onClick={handleSubmit}>
           Submit Answers
         </button>
       </div>
     )}
   </div>
 );
};

export default Form;
