package routes

import (
	"auth/controllers"

	"github.com/go-chi/chi/v5"
)

func ApiRoutes(router chi.Router) {
	router.Post("/signup", controllers.Signup)
	router.Post("/login", controllers.Login)
	router.Get("/reset-password", controllers.ResetPassword)
	router.Get("/forgot-password", controllers.ForgotPassword)
	router.Post("/verify", controllers.Verify)
}
