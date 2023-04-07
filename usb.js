// Specify the vendor and product ID of the USB device
const VENDOR_ID = 0x04B8;
const PRODUCT_ID = 0x0C0F;
// Request access to the USB device

function startUSB() {

    navigator.usb.requestDevice({ filters: [{ vendorId: VENDOR_ID, productId: PRODUCT_ID }] })
        .then(device => {
            console.log("USB device connected:", device);

            // Open the device and select a configuration
            return device.open()
                .then(() => device.selectConfiguration(1));
        })
        .then(() => {
            console.log("USB device ready to use");

            // Access the device interface and endpoints
            const interfaceNumber = 0;
            const endpointIn = 1;
            const endpointOut = 2;

            return device.claimInterface(interfaceNumber)
                .then(() => device.transferIn(endpointIn, 64))
                .then(result => {
                    //     // Get the element that you want to add text to
                    const container = document.getElementById("my-container");
                    //     // Set the inner HTML of the container element to the text that you want to add
                    container.innerHTML = result.data;
                    console.log("Received data:", result.data);
                });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
document.addEventListener("click", startUSB)


// const usb = require('usb');

// // Specify the vendor and product ID of the USB device
// const VENDOR_ID = 0x04B8;
// const PRODUCT_ID = 0x0C0F;
// //   // USB device vendor and product IDs
// //     const vendorId = 0x2717;
// //     const productId = 0xff08;
// // Find the USB device with the specified vendor and product ID
// const device = usb.findByIds(VENDOR_ID, PRODUCT_ID);

// // Open the device
// device.open();

// // Claim the interface that the device uses
// const interfaceNumber = device.interfaces[0].interfaceNumber;
// device.interfaces[0].claim();

// // Start listening for incoming data
// device.interfaces[0].endpoints[0].startPoll(1, 8);

// // Handle incoming data
// device.interfaces[0].endpoints[0].on("data", function (data) {


//     // Get the element that you want to add text to
//     const container = document.getElementById("my-container");
//     // Set the inner HTML of the container element to the text that you want to add
//     container.innerHTML = data;

//     console.log("Received data:", data);
// });

// // Handle errors
// device.interfaces[0].endpoints[0].on("error", function (error) {
//     console.error("Error:", error);
// });

// // Handle the "detach" event (if the USB device is disconnected)
// device.on("detach", function () {
//     console.log("Device detached");
// });
