import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";

const columnHeaders = [
  "Portafolio de productos y servicios competitivos",
  "Gestión de riesgo de negocio",
  "Cumplimiento con las leyes y regulaciones externas",
  "Calidad de la información financiera",
  "Cultura de servicio orientada al cliente",
  "Continuidad y disponibilidad del servicio del negocio",
  "Calidad de la información sobre gestión",
  "Optimización de la funcionalidad de procesos internos del negocio",
  "Optimización de costes de los procesos del negocio",
  "Habilidades, motivación y productividad del personal",
  "Cumplimiento de las políticas internas",
  "Gestión de programas de transformación digital",
  "Innovación de productos y negocios",
];

const rowHeaders = [
  "Cumplimiento y soporte de I&T para el cumplimiento empresarial con las leyes y regulaciones externas",
  "Gestión de riesgo relacionado con I&T",
  "Beneficios obtenidos del portafolio de inversiones y servicios relacionados con I&T",
  "Calidad de la información financiera relacionada con la tecnología",
  "Prestación de servicios de I&T conforme a los requisitos del negocio",
  "Agilidad para convertir los requisitos del negocio en soluciones operativas",
  "Seguridad de la información, infraestructura de procesamiento y aplicaciones, y privacidad",
  "Habilitar y dar soporte a procesos de negocio mediante la integración de aplicaciones y tecnología",
  "Ejecución de programas dentro del plazo, sin exceder el presupuesto, y que cumplen con los requisitos y estándares de calidad",
  "Calidad de la información sobre gestión de I&T",
  "Cumplimiento de I&T con las políticas internas",
  "Personal competente y motivado con un entendimiento mutuo de la tecnología y el negocio",
  "Conocimiento, experiencia e iniciativas para la innovación empresarial",
];

// Valores iniciales para las celdas, que contienen "S" y "P"
const initialCellValues: { [key: string]: string } = {
  "0-2": "P",
  "0-5": "S",
  "1-5": "P",
  "1-9": "S",
  "2-1": "P",
  "2-9": "S",
  "3-6": "P",
  "4-0": "S",
  "4-4": "S",
  "4-5": "S",
  "4-9": "P",
  "5-6": "S",
  "6-1": "P",
  "6-5": "S",
  "6-6": "S",
  "7-6": "S",
  "7-9": "S",
  "8-0": "P",
  "8-3": "P",
  "8-5": "S",
  "9-1": "P",
  "9-4": "P",
  "9-6": "S",
  "10-1": "P",
  "11-3": "P",
  "11-6": "S",
  "11-7": "P",
  "11-9": "S",
  "12-0": "S",
  "12-7": "P",
};

const RelacionamientoDeMetas = () => {
  const [cellValues, setCellValues] = useState<{ [key: string]: string }>(
    initialCellValues
  );
  const [editingCell, setEditingCell] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [cellClicks, setCellClicks] = useState<{ [key: string]: number }>({});
  const [selectedColumns, setSelectedColumns] = useState<Set<number>>(
    new Set()
  );

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    setEditingCell((prev) => ({
      ...prev,
      [cellKey]: !prev[cellKey],
    }));
  };

  const handleDoubleClick = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    setCellClicks((prev) => {
      const newCount = (prev[cellKey] || 0) + 1;
      return {
        ...prev,
        [cellKey]: newCount,
      };
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    setCellValues((prev) => ({
      ...prev,
      [cellKey]: e.target.value,
    }));
  };

  const handleColumnHeaderClick = (colIndex: number) => {
    setSelectedColumns((prev) => {
      const newSet = new Set(prev);
      if (prev.has(colIndex)) {
        newSet.delete(colIndex);
      } else {
        newSet.add(colIndex);
      }
      return newSet;
    });
  };

  const getCellBackgroundColor = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    if (selectedColumns.has(colIndex)) {
      const value = cellValues[cellKey];
      if (value === "S") {
        return "lightblue";
      } else if (value === "P") {
        // Marcar la fila correspondiente al encontrar una "P"
        const rowHeaderCell = document.getElementById(`rowHeader-${rowIndex}`);
        if (rowHeaderCell) {
          rowHeaderCell.style.backgroundColor = "orange";
        }
        return "blue";
      }
    }
    const clicks = cellClicks[cellKey] || 0;
    if (clicks >= 3) {
      return "blue";
    } else if (clicks >= 2) {
      return "lightblue";
    } else {
      return "transparent";
    }
  };

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4" component="h1" gutterBottom>
        Relacionamiento de Metas Empresariales y Metas de Alineamiento
      </Typography>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {columnHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  onClick={() => handleColumnHeaderClick(index)}
                  sx={{
                    cursor: "pointer",
                    bgcolor: selectedColumns.has(index)
                      ? "green"
                      : "transparent",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowHeaders.map((rowHeader, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell id={`rowHeader-${rowIndex}`}>{rowHeader}</TableCell>
                {columnHeaders.map((_, colIndex) => (
                  <TableCell
                    key={colIndex}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onDoubleClick={() => handleDoubleClick(rowIndex, colIndex)}
                    sx={{
                      cursor: "pointer",
                      bgcolor: getCellBackgroundColor(rowIndex, colIndex),
                    }}
                  >
                    {editingCell[`${rowIndex}-${colIndex}`] ? (
                      <TextField
                        value={cellValues[`${rowIndex}-${colIndex}`] || ""}
                        onChange={(e) =>
                          handleInputChange(e, rowIndex, colIndex)
                        }
                        onBlur={() => handleCellClick(rowIndex, colIndex)}
                        autoFocus
                        fullWidth
                      />
                    ) : (
                      cellValues[`${rowIndex}-${colIndex}`] || ""
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RelacionamientoDeMetas;
