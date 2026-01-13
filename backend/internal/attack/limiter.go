package attack

import "time"

type Limiter struct {
	tokens chan struct{}
}

// global rate limiter instance
var RateLimiter *Limiter

func InitRateLimiter(rps int) {
	RateLimiter = NewLimiter(rps)
}

func NewLimiter(rps int) *Limiter {
	l := &Limiter{
		tokens: make(chan struct{}, rps),
	}

	go func() {
		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()

		for range ticker.C {
			for i := 0; i < rps; i++ {
				select {
				case l.tokens <- struct{}{}:
				default:
				}
			}
		}
	}()

	return l
}

func (l *Limiter) Allow() {
	<-l.tokens
}
