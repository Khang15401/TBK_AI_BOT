LT_USERNAME = process.env.LT_USERNAME || "akhang147";
LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "c5rb3GfJA9WiMgkRK2j4tmuo9phwBbFeU29MgbtxA8QkbCCgXF";

var config = {
  commanCapabilities: {
    build: "Mocha-Selenium-Sample", //Build name
    tunnel: false // Make it true to run the localhost through tunnel
  },
  multiCapabilities: [
    // {
    //   // Desired capabilities
    //   name: "Your Test Name", // Test name
    //   platform: "Windows 10", // OS name
    //   browserName: "firefox",
    //   version: "latest",
    //   visual: false, // To take step by step screenshot
    //   network: false, // To capture network Logs
    //   console: false // To capture console logs.
    // },
    {
      name: "Test UI", // Test name
      platform: "Windows 11", // OS name
      browserName: "chrome",
      version: "latest",
      visual: true, // To take step by step screenshot
      network: true, // To capture network Logs
      console: true // To capture console logs.
    }
  ]
};

exports.capabilities = [];
// Code to support common capabilities
config.multiCapabilities.forEach(function(caps) {
  var temp_caps = JSON.parse(JSON.stringify(config.commanCapabilities));
  for (var i in caps) temp_caps[i] = caps[i];
  exports.capabilities.push(temp_caps);
});
