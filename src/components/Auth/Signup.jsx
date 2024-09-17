import signupImg from "../../assets/signup.webp"
import Template from "../../components/Auth/Template"

const  Signup = () => {
  return (
    <Template
      title="Join the millions learning to code with Ed-Tech for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
