import mongoose from "mongoose";
import Heading from "../models/worksheet/heading.model.js";
import Section from "../models/worksheet/section.model.js";
import { configDotenv } from "dotenv";

configDotenv();

async function seedHeadings() {
  try {
    // Get some reference data first
    const sections = await Section.find();

    const headingsData = [
      {
        orderId: 1,
        name: "FREIGHT",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 2,
        name: "PRE-DELIVERY",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 3,
        name: "ENGINE UP RATE",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 4,
        name: "FIRE EXT",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 5,
        name: "NUTCOVERS",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 6,
        name: "HUB CAPS",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 7,
        name: "SEAT COVERS",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 8,
        name: "DASH MAT",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 9,
        name: "FLOOR MATS",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 10,
        name: "SAFETY TRIANGLE/JACK",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 11,
        name: "MATTRESS PROTECTOR",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 12,
        name: "1ST AID KIT",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 13,
        name: "WEATHER SHIELD",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 14,
        name: "CHROME ADBLUE CAP",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 15,
        name: "WHEEL ALIGNMENT",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 16,
        name: "WINDOW TINT",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 17,
        name: "DETAILING",
        section: sections.find((h) => h.name === "Pre-Delivery")?._id,
      },
      {
        orderId: 18,
        name: "TOP TANK SKIRTS",
        section: sections.find((h) => h.name === "Stainless")?._id,
      },
      {
        orderId: 19,
        name: "TOP TANK SKIRTS LEDS",
        section: sections.find((h) => h.name === "Stainless")?._id,
      },
      {
        orderId: 20,
        name: "BOTTOM TANK SKIRTS",
        section: sections.find((h) => h.name === "Stainless")?._id,
      },
      {
        orderId: 21,
        name: "BOTTOM TANK SKIRTS LEDS",
        section: sections.find((h) => h.name === "Stainless")?._id,
      },
      {
        orderId: 22,
        name: "MIRROR COVERS",
        section: sections.find((h) => h.name === "Stainless")?._id,
      },
      {
        orderId: 23,
        name: "WING TRIMS",
        section: sections.find((h) => h.name === "Stainless")?._id,
      },
      {
        orderId: 24,
        name: "KICK PANELS",
        section: sections.find((h) => h.name === "Stainless")?._id,
      },
      {
        orderId: 25,
        name: "ICEPACK COVER",
        section: sections.find((h) => h.name === "Stainless")?._id,
      },
      {
        orderId: 26,
        name: "APPLICATION",
        section: sections.find((h) => h.name === "Hydraulics")?._id,
      },
      {
        orderId: 27,
        name: "PTO",
        section: sections.find((h) => h.name === "Hydraulics")?._id,
      },
      {
        orderId: 28,
        name: "TANK MODIFICATION",
        section: sections.find((h) => h.name === "Hydraulics")?._id,
      },
      {
        orderId: 29,
        name: "TANK MODIFICATION SPECIFICS ",
        section: sections.find((h) => h.name === "Hydraulics")?._id,
      },
      {
        orderId: 30,
        name: "CONTROLS",
        section: sections.find((h) => h.name === "Hydraulics")?._id,
      },
      {
        orderId: 31,
        name: "PRESSURE & RETURN",
        section: sections.find((h) => h.name === "Hydraulics")?._id,
      },
      {
        orderId: 32,
        name: "CONNECTIONS",
        section: sections.find((h) => h.name === "Hydraulics")?._id,
      },
      {
        orderId: 33,
        name: "REAR HOOK UP",
        section: sections.find((h) => h.name === "Hydraulics")?._id,
      },
      {
        orderId: 34,
        name: "FRONT HOOK UP",
        section: sections.find((h) => h.name === "Hydraulics")?._id,
      },
      {
        orderId: 35,
        name: "TRUCK PAINT",
        section: sections.find((h) => h.name === "Paint & Interior")?._id,
      },
      {
        orderId: 36,
        name: "TRUCK SIGNWRITING",
        section: sections.find((h) => h.name === "Paint & Interior")?._id,
      },
      {
        orderId: 37,
        name: "FRIDGE",
        section: sections.find((h) => h.name === "Paint & Interior")?._id,
      },
      {
        orderId: 38,
        name: "INVERTER",
        section: sections.find((h) => h.name === "Paint & Interior")?._id,
      },
      {
        orderId: 39,
        name: "MICROWAVE",
        section: sections.find((h) => h.name === "Paint & Interior")?._id,
      },
      {
        orderId: 40,
        name: "FUEL TANKS P/COATING",
        section: sections.find((h) => h.name === "Paint & Interior")?._id,
      },
      {
        orderId: 41,
        name: "RELOCATE INDICATORS",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 42,
        name: "2ND PAIR DRIVING LIGHTS",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 43,
        name: "TV",
        section: sections.find((h) => h.name === "Paint & Interior")?._id,
      },
      {
        orderId: 44,
        name: "DRIVING LIGHTS",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 45,
        name: "LOAD LIGHTS",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 46,
        name: "BUMPER LEDS",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 47,
        name: "ROOF LIGHTS",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 48,
        name: "BEACON",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 49,
        name: "AIR HORN",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 50,
        name: "SWAP FACTORY ANTENNA",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 51,
        name: "PV450",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 52,
        name: "GOLD BEZEL GAUGE",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 53,
        name: "UHF",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 54,
        name: "PARK BRAKE ALARM",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 55,
        name: "AUTOGREASER",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 56,
        name: "AIR CONDITIONER",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 57,
        name: "MIRROR LIGHTS",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 58,
        name: "SHROUD LED STRIP",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 59,
        name: "BUG LIGHT SURROUND",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 60,
        name: "ANDERSON PLUG",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 61,
        name: "REVERSE CAMERA",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 62,
        name: "BONNET KW SURROUND",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 63,
        name: "POWERVIEW",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 64,
        name: "GOLD BEZEL ON TEMP GAUGE",
        section: sections.find((h) => h.name === "Electrical")?._id,
      },
      {
        orderId: 65,
        name: "CONVEYOR GUARDS",
        section: sections.find((h) => h.name === "Guards")?._id,
      },
      {
        orderId: 66,
        name: "PLASTIC GUARDS",
        section: sections.find((h) => h.name === "Guards")?._id,
      },
      {
        orderId: 67,
        name: "DRIVE MUDFLAPS",
        section: sections.find((h) => h.name === "Guards")?._id,
      },
      {
        orderId: 68,
        name: "LIGHTBAR",
        section: sections.find((h) => h.name === "Guards")?._id,
      },
      {
        orderId: 69,
        name: "ANTI SAIL BRACKET",
        section: sections.find((h) => h.name === "Guards")?._id,
      },
      {
        orderId: 70,
        name: "TOWBAR",
        section: sections.find((h) => h.name === "Guards")?._id,
      },
      {
        orderId: 71,
        name: "GUARDS POLES",
        section: sections.find((h) => h.name === "Guards")?._id,
      },
      {
        orderId: 72,
        name: "HIGH TEMPRATURE WRAPPING",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 73,
        name: "STAINLESS GUARDS",
        section: sections.find((h) => h.name === "Guards")?._id,
      },
      {
        orderId: 74,
        name: "TURN STACK 45°",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 75,
        name: "EXHAUST",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 76,
        name: "BULLBAR",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 77,
        name: "MUDFLAPS TO BAR",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 78,
        name: "TIPS",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 79,
        name: "BONNET MUDFLAPS",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 80,
        name: "BUG DEFLECTOR (TOP)",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 81,
        name: "SUN-VISOR",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 82,
        name: "DEFLECTORS (SIDES)",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 83,
        name: "LOCKABLE FUEL CAPS",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 84,
        name: "STONEGUARD",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 85,
        name: "UPGRADED RIMS",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 86,
        name: "UPGRADED TYRES",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 87,
        name: "CAB RACK",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 88,
        name: "TOOLBOX",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 89,
        name: "WHEEL ARCH FLARES",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 90,
        name: "NON SLIP TO TANKS",
        section: sections.find((h) => h.name === "Front & Side")?._id,
      },
      {
        orderId: 91,
        name: "FRONT WALK PLATE",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 92,
        name: "WATER TANK",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 93,
        name: "REAR WALK PLATE",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 94,
        name: "FIRE EXTINGUISHER",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 95,
        name: "WEIGHT GAUGES",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 96,
        name: "POGO RELOCATION",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 97,
        name: "AIR FITTINGS",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 98,
        name: "CONSTANT AIR",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 99,
        name: "AIRLINE STOW",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 100,
        name: "HOOK HOLDER",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 101,
        name: "OTHER",
        section: sections.find((h) => h.name === "Extras")?._id,
      },
      {
        orderId: 102,
        name: "TURNTABLE MODS",
        section: sections.find((h) => h.name === "Rear")?._id,
      },
      {
        orderId: 103,
        name: "EXTERNAL CHARGE POINTS",
        section: sections.find((h) => h.name === "Extras")?._id,
      },
    ];

    // Clear existing options
    await Heading.deleteMany({});

    // Insert new options
    await Heading.insertMany(headingsData);

    console.log("Headings seeded successfully!");
  } catch (error) {
    console.error("Error seeding headings:", error);
  }
}

// Run the seed function
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => seedHeadings())
  .then(() => mongoose.connection.close());
