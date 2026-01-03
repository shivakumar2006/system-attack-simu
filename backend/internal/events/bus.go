package events

type Event struct {
	Type    string `json:"type"`
	Message string `json:"message"`
}

var Bus = make(chan Event, 100)

func Emit(eventType, message string) {
	Bus <- Event{
		Type:    eventType,
		Message: message,
	}
}
