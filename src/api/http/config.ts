export const CURRENT_CONFIG = {

  // license
  appId: '166185', // You need to go to the development website to apply.
  appKey: 'c27b8064dc8d90c7bdd5eb5ce421272', // You need to go to the development website to apply.
  appLicense: 'WGBlrZT5iKA/FWf1X9MIhGge2HDqG5KF3gwaeSH47pi5UM9PVEsIPfoTbTRjnr8FpGLDSXlO8kjV5eiK+4/yTY+9XeNqXhNXBMvXVqSt/uhfK7/FLIQYyNjR4kMwIZ8prT/tVlG3UfaoOgcUgULeUJxwfEFjYk17XDrA8f+H6YY=', // You need to go to the development website to apply.

  // http
  baseURL: 'http://localhost:6789/', // This url must end with "/". Example: 'http://192.168.1.1:6789/'
  websocketURL: 'ws://localhost:6789/api/v1/ws', // Example: 'ws://192.168.1.1:6789/api/v1/ws'

  // livestreaming
  // RTMP  Note: This IP is the address of the streaming server. If you want to see livestream on web page, you need to convert the RTMP stream to WebRTC stream.
  rtmpURL: 'rtmp://localhost:1935/live/mystream', // Example: 'rtmp://192.168.1.1/live/'
  // GB28181 Note:If you don't know what these parameters mean, you can go to Pilot2 and select the GB28181 page in the cloud platform. Where the parameters same as these parameters.
  gbServerIp: 'Please enter the server ip.',
  gbServerPort: 'Please enter the server port.',
  gbServerId: 'Please enter the server id.',
  gbAgentId: 'Please enter the agent id',
  gbPassword: 'Please enter the agent password',
  gbAgentPort: 'Please enter the local port.',
  gbAgentChannel: 'Please enter the channel.',
  // RTSP
  rtspUserName: 'Please enter the username.',
  rtspPassword: 'Please enter the password.',
  rtspPort: '8554',
  // Agora
  agoraAPPID: 'Please enter the agora app id.',
  agoraToken: 'Please enter the agora temporary token.',
  agoraChannel: 'Please enter the agora channel.',

  // map
  // You can apply on the AMap website.
  amapKey: 'Please enter the amap key.',

}
