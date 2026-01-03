package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"auth/controllers"
	"auth/routes"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	controllers.UserCollection = client.Database("system-attack-simu").Collection("users")

	// load jwt secrets
	controllers.JwtKey = []byte(os.Getenv("JWT_SECRET"))

	router := chi.NewRouter()
	routes.ApiRoutes(router)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	handlers := c.Handler(router)

	log.Println("Server starting running on port : 8080")
	http.ListenAndServe(":8080", handlers)
}
