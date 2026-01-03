package main

import (
	"backend/internal/attack"
	"backend/internal/events"
	"backend/internal/logs"
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rs/cors"
)

type AttackRequest struct {
	Target  string `json:"target"`
	Total   int    `json:"total"`
	Workers int    `json:"workers"`
}

func main() {
	logs.Start()

	r := chi.NewRouter()

	r.HandleFunc("/attack", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var req AttackRequest
		json.NewDecoder(r.Body).Decode(&req)

		events.Emit("ATTACK", "Attack initiated")

		summary := attack.StartAttack(req.Target, req.Total, req.Workers)

		events.Emit("ATTACK", "Attack completed")

		json.NewEncoder(w).Encode(summary)
	})

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	handlers := c.Handler(r)

	log.Println("🧠 Attacker service running on :8082")
	log.Fatal(http.ListenAndServe(":8082", handlers))
}
