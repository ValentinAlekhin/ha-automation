const { client } = require('../client')

class ActionEntity {
  constructor(name) {
    this.name = name
    this.listeners = []
    this.topic = `zigbee2mqtt/${ name }`
    client.subscribe(this.topic)
    client.on('message', this.triggerListeners.bind(this))
  }
  
  on(event, callback) {
    this.listeners.push({ event, callback })
  }
  
  unsubscribe(event) {
    this.listeners = this.listeners.filter(
      (listener) => listener.event !== event
    )
  }
  
  triggerListeners(topic, payload) {
    if (topic !== this.topic) return
    
    const parsedPayload = JSON.parse(payload.toString())
    const { action } = parsedPayload
    
    this.listeners
      .filter((listener) => listener.event === action)
      .forEach((listener) => listener.callback(parsedPayload))
  }
}

module.exports = { ActionEntity }