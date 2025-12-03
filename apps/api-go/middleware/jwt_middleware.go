package middleware

import (
	"api-go/models"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

// JWTMiddleware valida el token JWT en las peticiones
func JWTMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Obtener el header Authorization
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(models.ErrorResponse{
				Error: "Missing authorization header",
			})
		}

		// Extraer el token del header "Bearer {token}"
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			return c.Status(fiber.StatusUnauthorized).JSON(models.ErrorResponse{
				Error: "Invalid authorization header format. Expected 'Bearer {token}'",
			})
		}

		// Obtener el secret desde variable de entorno
		secret := os.Getenv("JWT_SECRET")
		if secret == "" {
			secret = "interseguro-secret-key-change-in-production"
		}

		// Parsear y validar el token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Verificar el método de firma
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fiber.NewError(fiber.StatusUnauthorized, "Invalid signing method")
			}
			return []byte(secret), nil
		})

		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(models.ErrorResponse{
				Error: "Invalid or expired token: " + err.Error(),
			})
		}

		if !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(models.ErrorResponse{
				Error: "Invalid token",
			})
		}

		// Extraer claims si es necesario
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			// Guardar información del usuario en el contexto
			c.Locals("userId", claims["sub"])
			c.Locals("username", claims["username"])
		}

		// Continuar con el siguiente handler
		return c.Next()
	}
}
