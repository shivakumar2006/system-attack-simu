package attack

import (
	"net/http"
	"sync"
	"time"
)

func Worker(target string, jobs <-chan int, results chan<- Result, wg *sync.WaitGroup) {
	defer wg.Done()

	client := &http.Client{
		Timeout: 2 * time.Second,
	}

	for range jobs {
		resp, err := client.Get(target)
		if err != nil {
			results <- Result{Success: false}
			continue
		}

		if resp.StatusCode >= 500 {
			results <- Result{Success: false}
		} else {
			results <- Result{Success: true}
		}

		resp.Body.Close()
	}
}
