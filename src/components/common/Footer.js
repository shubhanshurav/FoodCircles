// Footer component for footer section
const Footer = () => {
    const year = new Date().getFullYear();
    return (
      <div className="py-8 text-center border">
        Created By ❣️
        <a
          href="https://www.linkedin.com/in/shubhanshu-rao-052320208/"
          title="shubhanshu's Linkedin Profile"
        >
          <span>Shubhanshu</span>
        </a>

          <strong className="px-2">
          {year} <span>FoodCircles</span>
          </strong>
      </div>
    );
  };
  
  export default Footer;