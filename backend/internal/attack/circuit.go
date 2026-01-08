package attack

import (
	"time"

	"github.com/sony/gobreaker"
)

var CB *gobreaker.CircuitBreaker

func InitCircuitBreaker() {
	settings := gobreaker.Settings{
		Name:        "victim-service",
		MaxRequests: 5,                // when circuit opens then it will only allow 5 requests and after that it's open fully
		Interval:    30 * time.Second, // metrics reset window
		Timeout:     10 * time.Second, // open state duration

		ReadyToTrip: func(counts gobreaker.Counts) bool {
			// if 5 consecutive failures then trip the circuit
			return counts.ConsecutiveFailures >= 5
		},
	}

	CB = gobreaker.NewCircuitBreaker(settings)
}
