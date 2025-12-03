package handlers

import (
	"api-go/models"
	"api-go/services"
	"api-go/utils"
	"log"

	"github.com/gofiber/fiber/v2"
)

// QRHandler maneja las peticiones relacionadas con factorización QR
type QRHandler struct {
	qrService  *services.QRService
	httpClient *utils.HTTPClient
}

// NewQRHandler crea una nueva instancia del handler
func NewQRHandler() *QRHandler {
	return &QRHandler{
		qrService:  services.NewQRService(),
		httpClient: utils.NewHTTPClient(),
	}
}

// ProcessMatrix maneja la petición POST para factorizar una matriz
// @Summary Factoriza una matriz usando QR decomposition
// @Description Recibe una matriz, realiza factorización QR y calcula estadísticas
// @Accept json
// @Produce json
// @Param matrix body models.MatrixRequest true "Matriz a factorizar"
// @Success 200 {object} models.QRResponse
// @Failure 400 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /api/qr [post]
func (h *QRHandler) ProcessMatrix(c *fiber.Ctx) error {
	// 1. Parsear el request body
	var req models.MatrixRequest
	if err := c.BodyParser(&req); err != nil {
		log.Printf("Error parsing request body: %v", err)
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Error: "Invalid request format: " + err.Error(),
		})
	}

	// 2. Validar que la matriz no esté vacía
	if len(req.Matrix) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Error: "Matrix cannot be empty",
		})
	}

	if len(req.Matrix[0]) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Error: "Matrix rows cannot be empty",
		})
	}

	log.Printf("Received matrix with dimensions: %dx%d", len(req.Matrix), len(req.Matrix[0]))

	// 3. Factorizar la matriz usando QR decomposition
	q, r, err := h.qrService.FactorizeQR(req.Matrix)
	if err != nil {
		log.Printf("Error performing QR factorization: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Error: "Error performing QR factorization: " + err.Error(),
		})
	}

	log.Printf("QR factorization completed. Q: %dx%d, R: %dx%d",
		len(q), len(q[0]), len(r), len(r[0]))

	// 4. Enviar matrices Q y R a la API de Node.js para calcular estadísticas
	statistics, err := h.httpClient.SendToStatistics(q, r)
	if err != nil {
		log.Printf("Error getting statistics from Node.js API: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Error: "Error calculating statistics: " + err.Error(),
		})
	}

	log.Printf("Statistics calculated successfully: max=%.2f, min=%.2f, avg=%.2f, sum=%.2f, diagonal=%v",
		statistics.Max, statistics.Min, statistics.Average, statistics.Sum, statistics.IsDiagonal)

	// 5. Retornar la respuesta combinada (Q, R y estadísticas)
	response := models.QRResponse{
		Q:          q,
		R:          r,
		Statistics: *statistics,
	}

	return c.Status(fiber.StatusOK).JSON(response)
}

// HealthCheck maneja el endpoint de health check
func (h *QRHandler) HealthCheck(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "healthy",
		"service": "api-go",
	})
}
