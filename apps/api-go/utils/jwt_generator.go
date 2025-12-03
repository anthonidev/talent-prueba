package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// GenerateJWT genera un token JWT para autenticarse con la API de Node.js
func GenerateJWT() (string, error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "interseguro-secret-key-change-in-production"
	}

	// Crear claims
	claims := jwt.MapClaims{
		"sub":      "1",
		"username": "api-go",
		"iat":      time.Now().Unix(),
		"exp":      time.Now().Add(time.Hour * 1).Unix(), // Expira en 1 hora
	}

	// Crear token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Firmar token
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
