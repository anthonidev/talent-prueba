package main

import (
	"api-go/handlers"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	// Crear la aplicación Fiber
	app := fiber.New(fiber.Config{
		AppName: "Interseguro QR Factorization API",
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}
			return c.Status(code).JSON(fiber.Map{
				"error": err.Error(),
			})
		},
	})

	// Middlewares
	app.Use(recover.New()) // Recuperación de panics
	app.Use(logger.New(logger.Config{
		Format:     "[${time}] ${status} - ${method} ${path} (${latency})\n",
		TimeFormat: "2006-01-02 15:04:05",
	}))
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	// Crear instancia del handler
	qrHandler := handlers.NewQRHandler()

	// Rutas
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Interseguro QR Factorization API",
			"version": "1.0.0",
			"endpoints": fiber.Map{
				"POST /api/qr": "Perform QR factorization on a matrix",
				"GET /health":  "Health check endpoint",
			},
		})
	})

	app.Get("/health", qrHandler.HealthCheck)
	app.Post("/api/qr", qrHandler.ProcessMatrix)

	// Obtener el puerto desde variable de entorno
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Iniciar el servidor
	log.Printf("🚀 Server starting on port %s", port)
	log.Printf("📍 Endpoints:")
	log.Printf("   - POST http://localhost:%s/api/qr", port)
	log.Printf("   - GET  http://localhost:%s/health", port)

	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
