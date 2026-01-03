package main

import (
	"log"
	"net/http"

	"backend/internal/victim"

	"github.com/go-chi/chi/v5"
)

func main() {
	chi := chi.NewRouter()
	chi.HandleFunc("/hit", victim.Handle)

	log.Println("🎯 Victim service running on :8081")
	log.Fatal(http.ListenAndServe(":8081", chi))
}
