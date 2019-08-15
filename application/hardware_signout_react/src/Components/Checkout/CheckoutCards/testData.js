export const MCUs = [
    { value: 'arduino', label: 'Arduino' },
    { value: 'launchPad', label: 'LaunchPad'},
    { value: 'nodeMCU', label: 'NodeMCU' },
    { value: 'photonBoard', label: 'Photon Board' },
    { value: 'raspberryPi', label: 'Raspberry Pi' },
    { value: 'electron', label: 'The Electron' },
    { value: 'green', label: 'Green' },
];
  
export const shields = [
    { value: 'avr', label: 'AVR' },
    { value: 'bluetoothModule', label: 'Bluetooth Wireless Module' },
    { value: 'controllerShield', label: 'Controller Shield' },
    { value: 'gyroscope', label: 'Gyroscope' },
];

export let quantity = [];
for (let i = 1; i < 16; i++) {
    quantity = quantity.concat({value: i, label: i});
}

// 

export const groupedOptions = [
    {
        label: 'MCUs',
        options: MCUs,
      },
      {
        label: 'Shields and Breakout Boards',
        options: shields,
      },
      {
        label: 'Sensors',
        options: shields,
      },
      {
        label: 'Computer Peripherals',
        options: shields,
      },
      {
        label: 'Acuators and speakers',
        options: shields,
      },
      {
        label: 'Power Supply',
        options: shields,
      },
      {
        label: 'Passive',
        options: shields,
      },
      {
        label: 'Mechanical',
        options: shields,
      },
];

// export default quantity;
