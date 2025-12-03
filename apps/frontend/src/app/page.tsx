"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { apiService } from "@/services/api";
import { QRResponse } from "@/types";
import MatrixInput from "@/components/MatrixInput";
import ResultDisplay from "@/components/ResultDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";
import Footer from "@/components/Footer";
import { Activity, Code2, Database, Terminal, Calculator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [result, setResult] = useState<QRResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (matrix: number[][]) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiService.processMatrix(matrix);
      setResult(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al procesar la matriz");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              Factorización QR
            </h1>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-secondary/20">
              <Code2 className="w-4 h-4" />
              <span className="font-medium">Go</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-secondary/20">
              <Terminal className="w-4 h-4" />
              <span className="font-medium">NestJS</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input & Info */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MatrixInput onSubmit={handleSubmit} loading={loading} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/50">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-primary">
                    <Database className="w-5 h-5 mr-2" />
                    Sobre la Descomposición QR
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    La descomposición QR factoriza una matriz A en un producto A
                    = QR de una matriz ortogonal Q y una matriz triangular
                    superior R. Es ampliamente utilizada para resolver problemas
                    de mínimos cuadrados lineales y cálculo de valores propios.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 space-y-6">
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 space-y-4"
              >
                <LoadingSpinner />
                <p className="text-muted-foreground animate-pulse">
                  Procesando matriz...
                </p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 flex items-center shadow-sm"
              >
                <div className="mr-3 p-2 bg-destructive/10 rounded-full">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Error al Procesar</h3>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </motion.div>
            )}

            {result && !loading && <ResultDisplay result={result} />}

            {!result && !loading && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border/50 rounded-xl bg-card/30"
              >
                <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center mb-6 ring-8 ring-secondary/10">
                  <Calculator className="w-10 h-10 opacity-50" />
                </div>
                <p className="text-xl font-medium text-foreground/80">
                  Listo para Procesar
                </p>
                <p className="text-sm mt-2 max-w-xs text-center text-muted-foreground/80">
                  Ingresa una matriz en el panel izquierdo para ver los
                  resultados de la factorización.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
