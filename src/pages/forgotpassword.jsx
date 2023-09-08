import  { useState } from 'react';
import axios from "axios"
function ForgotPassword() {
  const [email, setEmail] = useState('');
const [mailSent, setMailSent] = useState(true);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   const response = await axios.post("http://localhost:3000/api/users/forgotPassword", {email}) 
  
   if (response.data.message === 'Email sent successfully.') {
    console.log(response.data);
    setMailSent(false);
  
   }
       if (response.data.code === 0) {
      console.log(response.data);
      alert("The given email address is not found.");
    }
    
   else {
    // Handle other cases or errors.
    console.log('Unexpected response:', response.data);
  }
  

  };

  return (
    <>
{mailSent ?
    (<div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <b><label>
          Enter  Your Email to Send Link</label></b><br />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        <br /><br />
        <button type="submit">send</button>
      </form>
    </div>) : ( <>  <h1>mail sent succesfully</h1></>)}
    </>
     );
}

export default ForgotPassword;
