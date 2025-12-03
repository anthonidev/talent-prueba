package models

// MatrixRequest representa la solicitud con la matriz de entrada
type MatrixRequest struct {
	Matrix [][]float64 `json:"matrix"`
}

// QRResponse representa la respuesta completa con Q, R y estadísticas
type QRResponse struct {
	Q          [][]float64 `json:"q"`
	R          [][]float64 `json:"r"`
	Statistics Statistics  `json:"statistics"`
}

// Statistics representa las estadísticas calculadas por la API de Node.js
type Statistics struct {
	Max        float64 `json:"max"`
	Min        float64 `json:"min"`
	Average    float64 `json:"average"`
	Sum        float64 `json:"sum"`
	IsDiagonal bool    `json:"is_diagonal"`
}

// StatisticsRequest representa la solicitud que se envía a la API de Node.js
type StatisticsRequest struct {
	Q [][]float64 `json:"q"`
	R [][]float64 `json:"r"`
}

// ErrorResponse representa una respuesta de error
type ErrorResponse struct {
	Error string `json:"error"`
}
