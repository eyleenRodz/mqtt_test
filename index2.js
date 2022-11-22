const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

const host = 'wss://broker.emqx.io:8083/mqtt'

const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000
}

console.log('Connecting mqtt client')
const client = mqtt.connect(host, options)

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting...')
})

client.on('message', function (topic, payload, packet) {
    // Payload is Buffer
    //console.log(`Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`)
    const element = document.getElementById('response')
    element.innerText =`Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`;
  })

sendRequest =() =>{
    console.log('requesting');
    client.subscribe('test', function (err) {
        if (!err) {
        client.publish('Salida', '1')
        }
    })
}


