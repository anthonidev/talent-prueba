package utils

import (
	"api-go/models"
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

// HTTPClient maneja las peticiones HTTP a servicios externos
type HTTPClient struct {
	client *http.Client
}

// NewHTTPClient crea una nueva instancia del cliente HTTP
func NewHTTPClient() *HTTPClient {
	return &HTTPClient{
		client: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

// SendToStatistics envía las matrices Q y R a la API de Node.js para calcular estadísticas
func (h *HTTPClient) SendToStatistics(q, r [][]float64) (*models.Statistics, error) {
	// Obtener URL de la API de Node.js desde variable de entorno
	nodeAPIURL := os.Getenv("NODE_API_URL")
	if nodeAPIURL == "" {
		nodeAPIURL = "http://localhost:3000" // Valor por defecto
	}

	url := fmt.Sprintf("%s/api/statistics", nodeAPIURL)

	// Crear el request body
	requestBody := models.StatisticsRequest{
		Q: q,
		R: r,
	}

	// Serializar a JSON
	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		return nil, fmt.Errorf("error serializing request: %w", err)
	}

	// Crear la petición HTTP
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	// Establecer headers
	req.Header.Set("Content-Type", "application/json")

	// Generar y agregar token JWT
	token, err := GenerateJWT()
	if err != nil {
		return nil, fmt.Errorf("error generating JWT token: %w", err)
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

	// Realizar la petición
	resp, err := h.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making request to Node.js API: %w", err)
	}
	defer resp.Body.Close()

	// Leer el cuerpo de la respuesta
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %w", err)
	}

	// Verificar el código de estado
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Node.js API returned error status %d: %s", resp.StatusCode, string(body))
	}

	// Parsear la respuesta JSON
	var statistics models.Statistics
	if err := json.Unmarshal(body, &statistics); err != nil {
		return nil, fmt.Errorf("error parsing response: %w", err)
	}

	// Validar que la respuesta tenga datos válidos
	if statistics.Max == 0 && statistics.Min == 0 && statistics.Sum == 0 {
		// Podría ser una matriz de ceros, pero verificamos que la respuesta sea válida
		if len(body) < 10 {
			return nil, errors.New("invalid response from statistics API")
		}
	}

	return &statistics, nil
}
