const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");

const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*" || "https://shubhanshu-foodcircles.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Congrats, Your server is up and running ...",
	});
});

// Endpoint to fetch Swiggy data
app.get("/api/restaurants", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5",
      {
        params: {
          lat: "19.0759837",
          lng: "72.8776559",
          is_seo_homepage_enabled: "true",
          page_type: "DESKTOP_WEB_LISTING",
        },
        headers: {
          "User-Agent": "Mozilla/5.0", 
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message); // More descriptive logging
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.get("/api/menu", async (req, res) => {
  try {
     const { restaurantId } = req.query; 
    //  console.log(restaurantId)

     if (!restaurantId) {
       return res.status(400).json({ error: "Restaurant ID is required" });
     }
    const response = await axios.get("https://www.swiggy.com/dapi/menu/pl", {
      params: {
        "page-type": "REGULAR_MENU",
        "complete-menu": "true",
        lat: "26.7829103", // Latitude of the restaurant
        lng: "79.027659", // Longitude of the restaurant
        restaurantId, // Replace with the actual restaurant ID
        catalog_qa: "undefined", // Keeping it as undefined if that’s the required value
        submitAction: "ENTER",
      },
      headers: {
        "User-Agent": "Mozilla/5.0", // Mimic a browser request
      },
    });

    res.json(response.data); // Send the menu data as JSON
  } catch (error) {
    console.error("Error fetching data:", error.message); // Log the error message
    res.status(500).json({ error: "Failed to fetch data" }); // Return error response
  }
});


// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});
