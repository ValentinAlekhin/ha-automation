package config

import (
	"fmt"
	"github.com/joho/godotenv"
	"os"
)

type config struct {
	MqttUrl      string
	MqttUsername string
	MqttPassword string
}

func getConfig(mqttUrl string, mqttUsername string, mqttPassword string) config {
	return config{MqttUrl: mqttUrl, MqttUsername: mqttUsername, MqttPassword: mqttPassword}
}

var Config config

func init() {
	err := godotenv.Load()
	if err != nil {
		panic(".env file not found")
	}

	mqttUrl := os.Getenv("MQTT_URL")
	mqttUsername := os.Getenv("MQTT_USERNAME")
	mqttPassword := os.Getenv("MQTT_PASSWORD")

	Config = getConfig(mqttUrl, mqttUsername, mqttPassword)

	fmt.Println(Config)
}
