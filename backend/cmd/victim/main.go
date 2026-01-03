package main

import (
	"log"
	"net/http"

	"backend/internal/victim"

	"github.com/go-chi/chi/v5"
	"github.com/rs/cors"
)

func main() {
	r := chi.NewRouter()
	r.HandleFunc("/hit", victim.Handle)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	handlers := c.Handler(r)

	log.Println("🎯 Victim service running on :8081")
	log.Fatal(http.ListenAndServe(":8081", handlers))
}
