package services

import (
	"errors"
	"gonum.org/v1/gonum/mat"
)

// QRService maneja la lógica de factorización QR
type QRService struct{}

// NewQRService crea una nueva instancia del servicio
func NewQRService() *QRService {
	return &QRService{}
}

// FactorizeQR realiza la factorización QR de una matriz
// Retorna las matrices Q (ortogonal) y R (triangular superior)
func (s *QRService) FactorizeQR(matrix [][]float64) ([][]float64, [][]float64, error) {
	// Validar que la matriz no esté vacía
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return nil, nil, errors.New("matrix cannot be empty")
	}

	rows := len(matrix)
	cols := len(matrix[0])

	// Validar que todas las filas tengan la misma longitud
	for _, row := range matrix {
		if len(row) != cols {
			return nil, nil, errors.New("all rows must have the same length")
		}
		// Validar que no haya valores inválidos
		for _, val := range row {
			if val != val { // Check for NaN
				return nil, nil, errors.New("matrix contains invalid values (NaN)")
			}
		}
	}

	// Convertir slice 2D a formato gonum mat.Dense
	data := make([]float64, 0, rows*cols)
	for _, row := range matrix {
		data = append(data, row...)
	}
	denseMat := mat.NewDense(rows, cols, data)

	// Realizar factorización QR
	var qr mat.QR
	qr.Factorize(denseMat)

	// Extraer matriz Q (ortogonal)
	var qMat mat.Dense
	qr.QTo(&qMat)

	// Extraer matriz R (triangular superior)
	var rMat mat.Dense
	qr.RTo(&rMat)

	// Convertir matrices Q y R de vuelta a slices 2D
	qRows, qCols := qMat.Dims()
	q := make([][]float64, qRows)
	for i := 0; i < qRows; i++ {
		q[i] = make([]float64, qCols)
		for j := 0; j < qCols; j++ {
			q[i][j] = qMat.At(i, j)
		}
	}

	rRows, rCols := rMat.Dims()
	r := make([][]float64, rRows)
	for i := 0; i < rRows; i++ {
		r[i] = make([]float64, rCols)
		for j := 0; j < rCols; j++ {
			r[i][j] = rMat.At(i, j)
		}
	}

	return q, r, nil
}
