package victim

import (
	"net/http"
	"time"
)

func Handle(w http.ResponseWriter, r *http.Request) {
	time.Sleep(100 * time.Millisecond) // controlled latency
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("😤 Victim survived"))
}

// func Handle(w http.ResponseWriter, r *http.Request) {
// 	// random latency
// 	time.Sleep(time.Duration(rand.Intn(400)) * time.Millisecond)

// 	// random crash
// 	if rand.Intn(100) < 30 {
// 		http.Error(w, "💀 Victim crashed", http.StatusInternalServerError)
// 		return
// 	}

// 	w.Write([]byte("😤 Victim survived"))
// }
