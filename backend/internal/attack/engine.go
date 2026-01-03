package attack

import "sync"

type Result struct {
	Success bool
	Error   bool
}

type Summary struct {
	Total   int `json:"total"`
	Success int `json:"success"`
	Failure int `json:"failure"`
}

func StartAttack(target string, total int, workers int) Summary {
	jobs := make(chan int, total)
	results := make(chan Result, total)

	var wg sync.WaitGroup

	// start workers
	for i := 0; i < workers; i++ {
		wg.Add(1)
		go Worker(target, jobs, results, &wg)
	}

	// send jobs
	for i := 0; i < total; i++ {
		jobs <- i
	}
	close(jobs)

	// wait workers async
	go func() {
		wg.Wait()
		close(results)
	}()

	summary := Summary{
		Total: total,
	}

	for res := range results {
		if res.Success {
			summary.Success++
		} else {
			summary.Failure++
		}
	}

	return summary
}
