const { client } = require('../client/')

class StateEntity {
  constructor(name, getObject, cacheField = {}) {
    this.name = name
    this.topic = `zigbee2mqtt/${ name }`
    this.getObject = getObject
    this.cacheField = cacheField
    this.cacheFieldKeys = Object.keys(cacheField)
    this.state = {}
    client.subscribe(this.topic)
    client.on('message', this.messageListener.bind(this))
    this.initialGet()
  }
  
  messageListener(topic, payload) {
    if (topic !== this.topic) return
    
    const parsedPayload = JSON.parse(payload.toString())
    this.setCacheField(parsedPayload)
    
    this.state = {
      ...this.cacheField,
      ...parsedPayload,
    }
  }
  
  setCacheField(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      if (!this.cacheFieldKeys.includes(key)) return
      
      this.cacheField[key] = value
    })
  }
  
  initialGet() {
    client.publish(`${ this.topic }/get`, JSON.stringify(this.getObject))
  }
  
  set(value) {
    client.publish(`${ this.topic }/set`, JSON.stringify(value))
    this.setCacheField(value)
  }
  
  get() {
    return this.state
  }
}

module.exports = { StateEntity }