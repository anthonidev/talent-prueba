"use client";

import { motion } from "framer-motion";
import { QRResponse } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ResultDisplayProps {
  result: QRResponse;
}

const MatrixDisplay = ({
  matrix,
  title,
  delay,
}: {
  matrix: number[][];
  title: string;
  delay: number;
}) => (
  <Card className="overflow-hidden border-primary/10 shadow-md">
    <CardHeader className="bg-secondary/30 pb-4 border-b border-border/50">
      <CardTitle className="text-base font-medium text-center text-primary/90">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <div className="overflow-x-auto p-4 flex justify-center">
        <div
          className="grid gap-1.5 min-w-max"
          style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)` }}
        >
          {matrix.map((row, i) =>
            row.map((val, j) => (
              <motion.div
                key={`${i}-${j}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: delay + i * 0.05 + j * 0.05,
                }}
                className="h-12 w-16 flex items-center justify-center text-sm font-mono bg-secondary/10 rounded-md border border-border/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                {val.toFixed(4)}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MatrixDisplay
          matrix={result.q}
          title="Matriz Q (Ortogonal)"
          delay={0.1}
        />
        <MatrixDisplay
          matrix={result.r}
          title="Matriz R (Triangular Superior)"
          delay={0.2}
        />
      </div>

      <Card className="border-primary/10 shadow-lg">
        <CardHeader>
          <CardTitle>Estadísticas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Métrica</TableHead>
                <TableHead className="text-center">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-center">
                  Valor Máximo
                </TableCell>
                <TableCell className="text-center">
                  {result.statistics.max.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-center">
                  Valor Mínimo
                </TableCell>
                <TableCell className="text-center">
                  {result.statistics.min.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-center">
                  Promedio
                </TableCell>
                <TableCell className="text-center">
                  {result.statistics.average.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-center">
                  Suma Total
                </TableCell>
                <TableCell className="text-center">
                  {result.statistics.sum.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-center">
                  Es Diagonal
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      result.statistics.is_diagonal
                        ? "bg-green-500/20 text-green-500"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {result.statistics.is_diagonal ? "Sí" : "No"}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
