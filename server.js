const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
var http = require('http').createServer(app);
var io = require('socket.io')(http);

require("dotenv").config();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.port || 3000;
const uri = process.env.MONGO_URI;
const collectionName = "environment_data";

const cardList = [
  {
    title: "Climate Change",
    image: "images/image-1.jpg",
    link: "About climate change",
    description:
      "Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, such as through variations in the solar cycle. But since the 1800s, human activities have been the main driver of climate change, primarily due to burning fossil fuels like coal, oil and gas.",
  },
  {
    title: "Natural Resource Use",
    image: "images/image-2.jpg",
    link: "About natural resource use",
    description:
      "One of the top environmental problems facing the world is the challenge of natural resource use. Virtually all economic activity ties into natural resource use, and many environmental activists decry not only the rapid exploitation of various inputs, but also the growing gulf between the wealthy and the less advantaged. For instance, the use of water by one community can threaten the existence of another and even permanently alter nature itself.  ",
  },
  {
    title: "Waste Production",
    image: "images/image-3.jpg",
    link: "About waste production",
    description:
      "Waste management and production is a key point that numerous environmental issues articles highlight. Dramatic pictures of refuse-choked waterways and giant floating patches of oceanic waste have highlighted the dangers of improperly disposed plastic. Similarly, electronic waste represents both an environmental danger and a missed opportunity given the inherent value of computers, peripherals, cellular phones, and other electronics that get tossed rather than recycled. In fact, the EPA states that only about one-quarter of all e-waste gets recycled.  ",
  },
  {
    title: "Water pollution",
    image: "images/image-4.jpg",
    link: "About Water Production",
    description:
      "Earth has been called the Blue Planet due to the proliferation of water on its surface, but far less of that liquid is potable than the casual observer might think. According to the World Wildlife Federation, “Only 3% of the world’s water is fresh water, and two-thirds of that is tucked away in frozen glaciers or otherwise unavailable for our use. As a result, some 1.1 billion people worldwide lack access to water, and a total of 2.7 billion find water scarce for at least one month of the year.” ",
  },
  {
    title: "Deforestation",
    image: "images/image-5.jpg",
    link: "About Deforestation",
    description: `Data from NASA shows that forests cover nearly a third of the world's landmass, and they play an incredibly important role in the wider environment. For example, forests
      Remove carbon dioxide from the air 
      Prevent erosion  
      Protect against floods 
      Encourage biodiversity 
      Provide timber and other related resources (e.g., mushrooms, maple syrup, usable barks, berries) 
      Unfortunately, developing nations too often resort to practices such as slash-and-burn clearing and failing to care for the soil afterward, which perpetuates a vicious cycle requiring the clearing of yet more trees. `,
  },
  {
    title: "Overfishing",
    image: "images/image-6.jpg",
    link: "About Overfishing",
    description:
      "While fishing supports human populations across the globe and isn’t inherently harmful to the wider world, poor fishing practices can cause lasting harm. How? When more fish get harvested than current populations can produce, a deficit develops. If such deficits continue unabated, fisheries can become economically unviable, endangered, and even extinct.",
  },
  {
    title: "Ocean Acidification",
    image: "images/image-7.jpg",
    link: "About Ocean Acidification",
    description:
      "Few laymen are aware that the ocean absorbs almost a third of the carbon dioxide released into the world. Even fewer know that increased carbon emissions can also impact water quality, altering the pH of the ocean itself. The National Oceanic and Atmospheric Administration has noted that the past 200 years has seen “approximately a 30 percent increase in [ocean] acidity,” which directly impacts so-called “shell building” creatures. Studies have linked reef bleaching, reef death, mollusk death, and ecosystem disturbance to this increasing acidification.",
  },
  {
    title: "Air Pollution",
    image: "images/image-8.jpg",
    link: "About Air Pollution",
    description: `The World Health Organization (WHO) defines air pollution as “fine particles in polluted air that penetrate deep into the lungs and cardiovascular system, causing diseases including stroke, heart disease, lung cancer, chronic obstructive pulmonary diseases and respiratory infections. Industry, transportation, coal power plants and household solid fuel usage are major contributors to air pollution.”`,
  },
];

app.get("/api/projects", (req, res) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection(collectionName);
    projectCollection.find({}).toArray(function (err, result) {
      if (err) {
        res.status(404).json({ statusCode: 404, data: err, message: "fail" });
      }
      res.status(200).json({ statusCode: 200, data: result, message: "success" });
    });
  });
});

app.post("/api/projects", (req, res) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection(collectionName);
    const data  = JSON.parse(JSON.stringify(req.body))
    projectCollection.insertOne(data, function (err, result) {
      if (err) {
        res.status(404).json({ message: "fail" });
      }
      res.status(200).json({ message: "success" });
    });
  });
});

// DB connection
const client = new MongoClient(uri,  { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const createCollection = (collectionName) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection(collectionName);
    if (err) {
      console.log("Filed to connect", err);
    }
    console.log("MongoDB connected");
    // insertData(cardList);
  });
};

const insertData = (data) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection(collectionName);
    projectCollection.insertMany(data, function (err, res) {
      if (err) {
        console.log("Failed to insert ", err);
      }
      console.log("successfully inserted");
    });
  });
};

http.listen(port, () => {
  console.log("App listening to: " + port);
  createCollection(collectionName);
});

//Sockets 
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  setInterval(()=>{
    socket.emit('Number Event', parseInt(Math.random()*10));
  }, 1000);

});
