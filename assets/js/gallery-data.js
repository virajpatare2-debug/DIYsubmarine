// Gallery and lightbox data. To add a photo: put the full image in media/photos/,
// an ~800 px copy in media/web/<name>-800.jpg, then add an entry below.
window.GALLERY_CATEGORIES = [
  { id: "cad", label: "CAD" },
  { id: "hull", label: "Hull & caps" },
  { id: "thrusters", label: "Thrusters" },
  { id: "wiring", label: "Wiring & tether" },
  { id: "testing", label: "Tank test" },
  { id: "fabrication", label: "Laser & 3D print" }
];

window.GALLERY = [
  {
    id: "CAD_Hull_Assembly_Screen",
    full: "media/cad-screenshots/CAD_Hull_Assembly_Screen.jpg",
    thumb: "media/web/CAD_Hull_Assembly_Screen-800.jpg",
    category: "cad",
    kind: "CAD",
    title: "SolidWorks hull assembly",
    caption: "The hull model on screen: pipe body, end caps and motor mount at the access end. Photographed from the laptop screen."
  },
  {
    id: "CAD_Review_SolidWorks",
    full: "media/photos/CAD_Review_SolidWorks.jpg",
    thumb: "media/web/CAD_Review_SolidWorks-800.jpg",
    category: "cad",
    kind: "Photo",
    title: "Reviewing the CAD model",
    caption: "Team member checking the SolidWorks hull model in the Makerspace."
  },
  {
    id: "Thruster_And_Access_Cap_Fitting",
    full: "media/photos/Thruster_And_Access_Cap_Fitting.jpg",
    thumb: "media/web/Thruster_And_Access_Cap_Fitting-800.jpg",
    category: "thrusters",
    kind: "Photo",
    title: "Fitting thrusters and access cap",
    caption: "Red-propeller thruster at one end and a sealed motor pod at the threaded-cap end of the hull."
  },
  {
    id: "Hull_Strapping_And_Drilling",
    full: "media/photos/Hull_Strapping_And_Drilling.jpg",
    thumb: "media/web/Hull_Strapping_And_Drilling-800.jpg",
    category: "hull",
    kind: "Photo",
    title: "Strapping the hull",
    caption: "Wire ties wrapped around the hull at several stations; grey threaded adapter and white plug at the near end."
  },
  {
    id: "Tether_Wiring_Routing",
    full: "media/photos/Tether_Wiring_Routing.jpg",
    thumb: "media/web/Tether_Wiring_Routing-800.jpg",
    category: "wiring",
    kind: "Photo",
    title: "Routing the tether",
    caption: "Trimming and joining wires; the motor pod and cable are tied to the hull."
  },
  {
    id: "Tank_Test_Launch",
    full: "media/photos/Tank_Test_Launch.jpg",
    thumb: "media/web/Tank_Test_Launch-800.jpg",
    category: "testing",
    kind: "Video still",
    title: "Tank test — launch",
    caption: "Lowering the hull into the test tank (still from the tank-test video)."
  },
  {
    id: "Tank_Test_Floating_Trim",
    full: "media/photos/Tank_Test_Floating_Trim.jpg",
    thumb: "media/web/Tank_Test_Floating_Trim-800.jpg",
    category: "testing",
    kind: "Video still",
    title: "Tank test — floating",
    caption: "The sealed hull floats level at the surface with the top above the waterline."
  },
  {
    id: "Tank_Test_Thruster_Pod",
    full: "media/photos/Tank_Test_Thruster_Pod.jpg",
    thumb: "media/web/Tank_Test_Thruster_Pod-800.jpg",
    category: "testing",
    kind: "Video still",
    title: "Tank test — thruster pod",
    caption: "Motor pod strapped beneath the hull; tether running to the tank edge."
  },
  {
    id: "CAD_Hull_Twin_Thrusters",
    full: "media/cad-screenshots/CAD_Hull_Twin_Thrusters.jpg",
    thumb: "media/web/CAD_Hull_Twin_Thrusters-800.jpg",
    category: "cad",
    kind: "CAD",
    title: "SolidWorks assembly — second iteration",
    caption: "Updated hull model with two thruster pods and propellers under the hull and the threaded access cap at the right. Photographed from the laptop screen."
  },
  {
    id: "CAD_Hull_Turntable_Still",
    full: "media/cad-screenshots/CAD_Hull_Turntable_Still.jpg",
    thumb: "media/web/CAD_Hull_Turntable_Still-800.jpg",
    category: "cad",
    kind: "Video still",
    title: "SolidWorks turntable",
    caption: "Still from the screen recording of the assembly being rotated in SolidWorks."
  },
  {
    id: "Laser_Cutter_Makerspace",
    full: "media/photos/Laser_Cutter_Makerspace.jpg",
    thumb: "media/web/Laser_Cutter_Makerspace-800.jpg",
    category: "fabrication",
    kind: "Photo",
    title: "Makerspace laser cutter",
    caption: "The CO2 laser cutter used for the flat parts (cradles, fins, ballast tray) cut from SolidWorks DXF exports."
  },
  {
    id: "Propeller_Bambu_Studio_Slicing",
    full: "media/photos/Propeller_Bambu_Studio_Slicing.jpg",
    thumb: "media/web/Propeller_Bambu_Studio_Slicing-800.jpg",
    category: "fabrication",
    kind: "Photo",
    title: "Propeller in Bambu Studio",
    caption: "The five-blade propeller STL placed on the A1 mini textured PEI plate, ready to slice."
  },
  {
    id: "A1_Mini_Printing_Propeller",
    full: "media/photos/A1_Mini_Printing_Propeller.jpg",
    thumb: "media/web/A1_Mini_Printing_Propeller-800.jpg",
    category: "fabrication",
    kind: "Video still",
    title: "A1 mini printing the propeller",
    caption: "Bambu Lab A1 mini printing the propeller blades in white PLA (still from the video)."
  },
  {
    id: "Twin_Thrusters_Overview",
    full: "media/photos/Twin_Thrusters_Overview.jpg",
    thumb: "media/web/Twin_Thrusters_Overview-800.jpg",
    category: "thrusters",
    kind: "Photo",
    title: "Two thrusters on the hull",
    caption: "Full hull with both motor pods fitted: thruster 1 near the fixed end cap, thruster 2 near the threaded access cap, both with white 3D-printed propellers."
  },
  {
    id: "Thruster_1_Front_Pod",
    full: "media/photos/Thruster_1_Front_Pod.jpg",
    thumb: "media/web/Thruster_1_Front_Pod-800.jpg",
    category: "thrusters",
    kind: "Photo",
    title: "Thruster 1 — near the fixed end cap",
    caption: "Motor in a sealed grey PVC sleeve, mounted across the hull and tied on with yellow wire; white printed propeller."
  },
  {
    id: "Thruster_2_Rear_Pod",
    full: "media/photos/Thruster_2_Rear_Pod.jpg",
    thumb: "media/web/Thruster_2_Rear_Pod-800.jpg",
    category: "thrusters",
    kind: "Photo",
    title: "Thruster 2 — near the access cap",
    caption: "Motor pod mounted along the hull on a bracket next to the threaded access cap and taped in place; white printed propeller."
  }
];
