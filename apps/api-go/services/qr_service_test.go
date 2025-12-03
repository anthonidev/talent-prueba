package services

import (
	"math"
	"testing"
)

func TestQRService_FactorizeQR(t *testing.T) {
	service := NewQRService()

	t.Run("should factorize 2x2 matrix correctly", func(t *testing.T) {
		matrix := [][]float64{
			{12, -51},
			{6, 167},
		}

		q, r, err := service.FactorizeQR(matrix)

		if err != nil {
			t.Fatalf("Expected no error, got %v", err)
		}

		if len(q) != 2 || len(q[0]) != 2 {
			t.Errorf("Expected Q to be 2x2, got %dx%d", len(q), len(q[0]))
		}

		if len(r) != 2 || len(r[0]) != 2 {
			t.Errorf("Expected R to be 2x2, got %dx%d", len(r), len(r[0]))
		}

		// Verify Q is orthogonal (Q^T * Q = I)
		verifyOrthogonal(t, q)

		// Verify R is upper triangular
		verifyUpperTriangular(t, r)
	})

	t.Run("should factorize 3x3 matrix correctly", func(t *testing.T) {
		matrix := [][]float64{
			{12, -51, 4},
			{6, 167, -68},
			{-4, 24, -41},
		}

		q, r, err := service.FactorizeQR(matrix)

		if err != nil {
			t.Fatalf("Expected no error, got %v", err)
		}

		if len(q) != 3 || len(q[0]) != 3 {
			t.Errorf("Expected Q to be 3x3, got %dx%d", len(q), len(q[0]))
		}

		if len(r) != 3 || len(r[0]) != 3 {
			t.Errorf("Expected R to be 3x3, got %dx%d", len(r), len(r[0]))
		}

		verifyOrthogonal(t, q)
		verifyUpperTriangular(t, r)
	})

	t.Run("should return error for empty matrix", func(t *testing.T) {
		matrix := [][]float64{}

		_, _, err := service.FactorizeQR(matrix)

		if err == nil {
			t.Error("Expected error for empty matrix, got nil")
		}
	})

	t.Run("should return error for matrix with empty rows", func(t *testing.T) {
		matrix := [][]float64{
			{},
		}

		_, _, err := service.FactorizeQR(matrix)

		if err == nil {
			t.Error("Expected error for matrix with empty rows, got nil")
		}
	})

	t.Run("should return error for matrix with inconsistent row lengths", func(t *testing.T) {
		matrix := [][]float64{
			{1, 2, 3},
			{4, 5}, // Missing one element
		}

		_, _, err := service.FactorizeQR(matrix)

		if err == nil {
			t.Error("Expected error for inconsistent row lengths, got nil")
		}
	})

	t.Run("should handle identity matrix", func(t *testing.T) {
		matrix := [][]float64{
			{1, 0, 0},
			{0, 1, 0},
			{0, 0, 1},
		}

		q, r, err := service.FactorizeQR(matrix)

		if err != nil {
			t.Fatalf("Expected no error, got %v", err)
		}

		verifyOrthogonal(t, q)
		verifyUpperTriangular(t, r)
	})

	t.Run("should handle rectangular matrix (more rows than columns)", func(t *testing.T) {
		matrix := [][]float64{
			{1, 2},
			{3, 4},
			{5, 6},
		}

		q, r, err := service.FactorizeQR(matrix)

		if err != nil {
			t.Fatalf("Expected no error, got %v", err)
		}

		if len(q) != 3 {
			t.Errorf("Expected Q to have 3 rows, got %d", len(q))
		}

		if len(r) != 3 {
			t.Errorf("Expected R to have 3 rows, got %d", len(r))
		}
	})
}

// Helper function to verify if a matrix is orthogonal
func verifyOrthogonal(t *testing.T, q [][]float64) {
	n := len(q)
	epsilon := 1e-10

	// Compute Q^T * Q
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			sum := 0.0
			for k := 0; k < len(q[0]); k++ {
				sum += q[k][i] * q[k][j]
			}

			expected := 0.0
			if i == j {
				expected = 1.0
			}

			if math.Abs(sum-expected) > epsilon {
				t.Errorf("Q is not orthogonal at position (%d,%d): got %f, expected %f", i, j, sum, expected)
			}
		}
	}
}

// Helper function to verify if a matrix is upper triangular
func verifyUpperTriangular(t *testing.T, r [][]float64) {
	epsilon := 1e-10

	for i := 0; i < len(r); i++ {
		for j := 0; j < len(r[0]) && j < i; j++ {
			if math.Abs(r[i][j]) > epsilon {
				t.Errorf("R is not upper triangular: R[%d][%d] = %f, expected ~0", i, j, r[i][j])
			}
		}
	}
}
