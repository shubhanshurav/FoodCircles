import { useState } from "react";
// import contact from "../Images/Contact-Us.png";

const Contact = () => {
  const [message, setMessage] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(true);
    }
  return (
    <div className="flex px-4 py-4">
      <div className="w-full">
      <img src= "./assets/shubhanshuimg.jpg" alt="Contact us" />
      </div>
      <div className="w-full border shadow-lg py-6">
         <h1 className="font-extrabold text-4xl pb-5 text-center text-yellow-500">Contact us</h1>
            <form onSubmit={handleSubmit} className="flex flex-col px-6 py-4">
              <span className="py-5">
                <label className="text-xl px-1 font-semibold">Name </label>
                <input type="text" placeholder="Name" className="border px-4 py-1 border-gray-300" required/>
              </span>
              <span className="py-5">
                <label className="text-xl px-1 font-semibold">Email id </label>
                <input type="email" placeholder="Email"  className="border px-4 py-1 border-gray-300" required/>
              </span>
              <div className="flex flex-col pb-4">
                <label className="text-xl px-1 font-semibold py-1">Message </label>
                <textarea placeholder="Type your Message here..." className="border px-4 py-6 border-gray-400" required></textarea>
              </div>
              <button type="submit" className="py-2 border bg-yellow-500 w-fit px-6 rounded-md">Submit</button>
              {message && <span>Thanks for contacting FoodFire, We will reply ASAP.</span>}
            </form>
      </div>
    </div>
  );
};

export default Contact;