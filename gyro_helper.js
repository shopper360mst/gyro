/**
 * initialize the accelerometer and gyro raw readings.
 * @example
 *  window.addEventListener('sensorDataChanged', (evt)=>{
 *    console.log('Reading', evt);
 *  }));
 * 
 *  new Gyro_Helper();
 */
export default class Gyro_Helper {
    constructor() {
      this.init();
    }
    init() {
      var self = this;
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
          // Handle iOS 13+ devices.
          DeviceMotionEvent.requestPermission().then((state) => {
            if (state === 'granted') {
              window.addEventListener('devicemotion', self.handleOrientation);
            } else {
              console.error('Request to access the orientation was rejected');
            }
          }).catch(console.error);
      } else {
          // Handle regular non iOS 13+ devices.
          window.addEventListener('devicemotion', self.handleOrientation);
      }
    }
    handleOrientation(evt) {
      window.dispatchEvent(
        new CustomEvent(
          'sensorDataChanged',
          {
              detail: {
                  data: evt,
              }
          }
        )
      );
    }
}