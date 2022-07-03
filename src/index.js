const { client } = require('./client')
const { ActionEntity } = require('./entities/actionEntity')
const { StateEntity } = require('./entities/stateEntity')

client.on('connect', async () => {
  console.log('Server started')
  
  const bigRoomMainLight = new StateEntity(
    'big_room_main_light',
    { state_l1: '' },
    {
      brightness_l2: 0,
      brightness_l1: 0,
    }
  )
  const bigRoomButton = new ActionEntity('big_room_button')
  bigRoomButton.on('1_single', () => {
    const { brightness_l1, state_l1 } = bigRoomMainLight.get()
    
    const isTargetBrightness = brightness_l1 === 254
    const isOn = state_l1 === 'ON'
    
    if (isTargetBrightness && isOn)
      return bigRoomMainLight.set({ state_l1: 'OFF' })
    
    if (brightness_l1 < 254 && isOn)
      return bigRoomMainLight.set({ brightness_l1: 254 })
    
    if (isTargetBrightness && !isOn)
      return bigRoomMainLight.set({ state_l1: 'ON' })
    
    bigRoomMainLight.set({ state_l1: 'ON', brightness_l1: 254 })
  })
  
  bigRoomButton.on('1_double', () => {
    const { brightness_l1, state_l1 } = bigRoomMainLight.get()
    
    const isTargetBrightness = brightness_l1 === 100
    const isOn = state_l1 === 'ON'
    
    if (isTargetBrightness && isOn)
      return bigRoomMainLight.set({ state_l1: 'OFF' })
    
    if (brightness_l1 !== 100 && isOn)
      return bigRoomMainLight.set({ brightness_l1: 100 })
    
    if (isTargetBrightness && !isOn)
      return bigRoomMainLight.set({ state_l1: 'ON' })
    
    bigRoomMainLight.set({ state_l1: 'ON', brightness_l1: 100 })
  })
})

client.on('error', console.log)
