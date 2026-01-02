package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"auth/models"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var UserCollection *mongo.Collection

var JwtKey []byte

func Signup(w http.ResponseWriter, r *http.Request) {
	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// check if the user is exist or not
	count, err := UserCollection.CountDocuments(ctx, bson.M{"email": user.Email})
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	if count > 0 {
		http.Error(w, "User already exist", http.StatusBadRequest)
		return
	}

	//hashed password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "failed to hashed the password", http.StatusInternalServerError)
		return
	}
	user.Password = string(hashedPassword)

	// now insert the user after signed up
	res, err := UserCollection.InsertOne(ctx, user)
	if err != nil {
		http.Error(w, "failed to insert user in database", http.StatusInternalServerError)
		return
	}

	insertedID, ok := res.InsertedID.(primitive.ObjectID)
	if !ok {
		http.Error(w, "error getting inserted id", http.StatusInternalServerError)
		return
	}
	user.ID = insertedID

	// generate jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": user.ID.Hex(),
		"exp":    time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString(JwtKey)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// remove password before sending
	user.Password = ""

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"token": tokenString,
		"user":  user,
	})
}
