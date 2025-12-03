"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RefreshCw, Grid3X3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface MatrixInputProps {
  onSubmit: (matrix: number[][]) => void;
  loading: boolean;
}

export default function MatrixInput({ onSubmit, loading }: MatrixInputProps) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState<string[][]>(
    Array(3).fill(Array(3).fill(""))
  );

  const handleResize = (newRows: number, newCols: number) => {
    // Limit dimensions to reasonable values
    if (newRows < 2) newRows = 2;
    if (newRows > 8) newRows = 8;
    if (newCols < 2) newCols = 2;
    if (newCols > 8) newCols = 8;

    const newMatrix = Array(newRows)
      .fill("")
      .map((_, i) =>
        Array(newCols)
          .fill("")
          .map((_, j) =>
            i < matrix.length && j < matrix[0].length ? matrix[i][j] : ""
          )
      );
    setRows(newRows);
    setCols(newCols);
    setMatrix(newMatrix);
  };

  const handleChange = (row: number, col: number, value: string) => {
    const newMatrix = [...matrix.map((r) => [...r])];
    newMatrix[row][col] = value;
    setMatrix(newMatrix);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numMatrix = matrix.map((row) => row.map((val) => Number(val) || 0));
    onSubmit(numMatrix);
  };

  const handleClear = () => {
    setMatrix(
      Array(rows)
        .fill("")
        .map(() => Array(cols).fill(""))
    );
  };

  return (
    <Card className="w-full shadow-lg border-primary/10">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2 mb-1">
          <Grid3X3 className="w-5 h-5 text-primary" />
          <CardTitle>Matriz de Entrada</CardTitle>
        </div>
        <CardDescription>
          Define las dimensiones e ingresa los valores.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-end gap-4 mb-8 p-4 bg-secondary/10 rounded-lg border border-border/50">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Filas
            </label>
            <Input
              type="number"
              min="2"
              max="8"
              value={rows}
              onChange={(e) => handleResize(Number(e.target.value), cols)}
              className="w-20 h-10 text-center"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Columnas
            </label>
            <Input
              type="number"
              min="2"
              max="8"
              value={cols}
              onChange={(e) => handleResize(rows, Number(e.target.value))}
              className="w-20 h-10 text-center"
            />
          </div>
          <div className="ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              type="button"
              className="h-10 border-dashed hover:border-solid hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto pb-2 mb-6 flex justify-center">
            <div
              className="grid gap-3 p-4 bg-secondary/5 rounded-xl border border-border/30 shadow-inner"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(70px, 1fr))`,
                maxWidth: "100%",
              }}
            >
              <AnimatePresence initial={false}>
                {matrix.map((row, i) =>
                  row.map((val, j) => (
                    <motion.div
                      key={`${i}-${j}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        type="number"
                        step="any"
                        value={val}
                        onChange={(e) => handleChange(i, j, e.target.value)}
                        placeholder="0"
                        className="w-full h-12 text-center text-base font-mono shadow-sm transition-all hover:border-primary/40 focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:border-primary/50 placeholder:text-muted-foreground/20"
                      />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto min-w-[200px] h-11 text-base font-medium shadow-lg shadow-primary/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2 fill-current" />
                  Procesar Matriz
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
