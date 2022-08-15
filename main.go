package main

import (
	"fmt"
	mqtt "github.com/eclipse/paho.mqtt.golang"
	"ha-automation/client"
)

var messagePubHandler mqtt.MessageHandler = func(client mqtt.Client, msg mqtt.Message) {
	fmt.Printf("Received message: %s from topic: %s\n", msg.Payload(), msg.Topic())
}

func main() {
	c := client.Get(messagePubHandler)

	sub(c)

	select {}
}

//func publish(client client.Client) {
//	num := 10
//	for i := 0; i < num; i++ {
//		text := fmt.Sprintf("Message %d", i)
//		token := client.Publish("topic/test", 0, false, text)
//		token.Wait()
//		time.Sleep(time.Second)
//	}
//}

func sub(client mqtt.Client) {
	topic := "zigbee2mqtt/big_room_button"
	token := client.Subscribe(topic, 1, nil)
	token.Wait()
	fmt.Printf("Subscribed to topic: %s", topic)
}
