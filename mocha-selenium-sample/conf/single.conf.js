
LT_USERNAME = process.env.LT_USERNAME || "akhang147";
LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "c5rb3GfJA9WiMgkRK2j4tmuo9phwBbFeU29MgbtxA8QkbCCgXF";

exports.capabilities = {
	"browserName": "Chrome",
	"browserVersion": "latest",
	"LT:Options": {
		"username": "akhang147",
		"accessKey": "c5rb3GfJA9WiMgkRK2j4tmuo9phwBbFeU29MgbtxA8QkbCCgXF",
    "visual": true,
		"geoLocation": "VN",
		"platformName": "Windows 11",
		"timezone": "Ho_Chi_Minh",
		"project": "BOT_QC_AI",
		"smartUI.project": "TBK",
		"name": "TBK_UI",
		"w3c": true,
		"plugin": "mocha-mocha"
	}
};