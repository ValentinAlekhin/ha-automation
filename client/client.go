package client

import (
	"fmt"
	mqtt "github.com/eclipse/paho.mqtt.golang"
	"ha-automation/config"
)

var connectHandler mqtt.OnConnectHandler = func(client mqtt.Client) {
	fmt.Println("Connected")
}

func Get(messageHandler mqtt.MessageHandler) mqtt.Client {
	opts := mqtt.NewClientOptions()
	opts.AddBroker(config.Config.MqttUrl)
	opts.SetClientID("go_mqtt_client")
	opts.SetUsername(config.Config.MqttUsername)
	opts.SetPassword(config.Config.MqttPassword)
	opts.SetDefaultPublishHandler(messageHandler)
	opts.OnConnect = connectHandler
	client := mqtt.NewClient(opts)

	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}

	return client
}
