package victim

import (
	"math/rand"
	"net/http"
	"time"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	// random latency
	time.Sleep(time.Duration(rand.Intn(400)) * time.Millisecond)

	// random crash
	if rand.Intn(100) < 30 {
		http.Error(w, "💀 Victim crashed", http.StatusInternalServerError)
		return
	}

	w.Write([]byte("😤 Victim crashed"))
}
