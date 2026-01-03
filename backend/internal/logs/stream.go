package logs

import (
	"internal/events"
	"log"
)

func Start() {
	go func() {
		for event := range events.Bus {
			log.Printf("[%s] %s\n", event.Type, event.Message)
		}
	}()
}
