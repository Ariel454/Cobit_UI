import React, { useState, useRef, useEffect } from "react";
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
  {
    id: 1,
    codigo: "EM01",
    descripcion: "Portafolio de productos y servicios competitivos",
  },
  { id: 2, codigo: "EM02", descripcion: "Gestión de riesgo de negocio" },
  {
    id: 3,
    codigo: "EM03",
    descripcion: "Cumplimiento con las leyes y regulaciones externas",
  },
  {
    id: 4,
    codigo: "EM04",
    descripcion: "Calidad de la información financiera",
  },
  {
    id: 5,
    codigo: "EM05",
    descripcion: "Cultura de servicio orientada al cliente",
  },
  {
    id: 6,
    codigo: "EM06",
    descripcion: "Continuidad y disponibilidad del servicio del negocio",
  },
  {
    id: 7,
    codigo: "EM07",
    descripcion: "Calidad de la información sobre gestión",
  },
  {
    id: 8,
    codigo: "EM08",
    descripcion:
      "Optimización de la funcionalidad de procesos internos del negocio",
  },
  {
    id: 9,
    codigo: "EM09",
    descripcion: "Optimización de costes de los procesos del negocio",
  },
  {
    id: 10,
    codigo: "EM10",
    descripcion: "Habilidades, motivación y productividad del personal",
  },
  {
    id: 11,
    codigo: "EM11",
    descripcion: "Cumplimiento de las políticas internas",
  },
  {
    id: 12,
    codigo: "EM12",
    descripcion: "Gestión de programas de transformación digital",
  },
  { id: 13, codigo: "EM13", descripcion: "Innovación de productos y negocios" },
];

const rowHeaders = [
  {
    id: 1,
    codigo: "AG01",
    descripcion:
      "Cumplimiento y soporte de I&T para el cumplimiento empresarial con las leyes y regulaciones externas",
  },
  {
    id: 2,
    codigo: "AG02",
    descripcion: "Gestión de riesgo relacionado con I&T",
  },
  {
    id: 3,
    codigo: "AG03",
    descripcion:
      "Beneficios obtenidos del portafolio de inversiones y servicios relacionados con I&T",
  },
  {
    id: 4,
    codigo: "AG04",
    descripcion:
      "Calidad de la información financiera relacionada con la tecnología",
  },
  {
    id: 5,
    codigo: "AG05",
    descripcion:
      "Prestación de servicios de I&T conforme a los requisitos del negocio",
  },
  {
    id: 6,
    codigo: "AG06",
    descripcion:
      "Agilidad para convertir los requisitos del negocio en soluciones operativas",
  },
  {
    id: 7,
    codigo: "AG07",
    descripcion:
      "Seguridad de la información, infraestructura de procesamiento y aplicaciones, y privacidad",
  },
  {
    id: 8,
    codigo: "AG08",
    descripcion:
      "Habilitar y dar soporte a procesos de negocio mediante la integración de aplicaciones y tecnología",
  },
  {
    id: 9,
    codigo: "AG09",
    descripcion:
      "Ejecución de programas dentro del plazo, sin exceder el presupuesto, y que cumplen con los requisitos y estándares de calidad",
  },
  {
    id: 10,
    codigo: "AG10",
    descripcion: "Calidad de la información sobre gestión de I&T",
  },
  {
    id: 11,
    codigo: "AG11",
    descripcion: "Cumplimiento de I&T con las políticas internas",
  },
  {
    id: 12,
    codigo: "AG12",
    descripcion:
      "Personal competente y motivado con un entendimiento mutuo de la tecnología y el negocio",
  },
  {
    id: 13,
    codigo: "AG13",
    descripcion:
      "Conocimiento, experiencia e iniciativas para la innovación empresarial",
  },
];

const initialCellValues: { [key: string]: string } = {
  "1-2": "S",
  "1-3": "P",
  "1-6": "S",
  "2-6": "P",
  "2-10": "S",
  "3-2": "P",
  "3-10": "S",
  "4-7": "P",
  "5-1": "S",
  "5-5": "S",
  "5-6": "S",
  "5-10": "P",
  "6-7": "S",
  "7-2": "P",
  "7-6": "S",
  "7-7": "S",
  "8-7": "S",
  "8-10": "S",
  "9-1": "P",
  "9-4": "P",
  "9-6": "S",
  "10-2": "P",
  "10-5": "P",
  "10-7": "S",
  "11-2": "P",
  "12-4": "P",
  "12-7": "S",
  "12-8": "P",
  "12-10": "S",
  "13-1": "S",
  "13-8": "P",
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
    const cellKey = `${rowIndex + 1}-${colIndex + 1}`;
    setEditingCell((prev) => ({
      ...prev,
      [cellKey]: !prev[cellKey],
    }));
  };

  const handleDoubleClick = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex + 1}-${colIndex + 1}`;
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
    const cellKey = `${rowIndex + 1}-${colIndex + 1}`;
    setCellValues((prev) => ({
      ...prev,
      [cellKey]: e.target.value,
    }));
  };

  const handleColumnHeaderClick = (colIndex: number) => {
    const selectedRowHeader = rowHeaders.find((row) => {
      const cellKey = `${row.id}-${colIndex + 1}`;
      return cellValues[cellKey] === "P";
    });

    if (selectedRowHeader) {
      // Aquí puedes manejar el valor del encabezado de la fila que tiene una "P"
      console.log("Encabezado seleccionado:", selectedRowHeader);
      // Guardar en el estado o realizar alguna otra acción
    }

    setSelectedColumns((prev) => {
      const newSet = new Set(prev);
      if (prev.has(colIndex + 1)) {
        newSet.delete(colIndex + 1);
      } else {
        newSet.add(colIndex + 1);
      }
      return newSet;
    });
  };

  const getCellBackgroundColor = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex + 1}-${colIndex + 1}`;
    if (selectedColumns.has(colIndex + 1)) {
      const value = cellValues[cellKey];
      if (value === "S") {
        return "grey";
      } else if (value === "P") {
        // Marcar la fila correspondiente al encontrar una "P"
        const rowHeaderCell = document.getElementById(`rowHeader-${rowIndex}`);
        if (rowHeaderCell) {
          rowHeaderCell.style.backgroundColor = "orange";
        }
        return "lightblue";
      }
    }
    const clicks = cellClicks[cellKey] || 0;
    if (clicks >= 3) {
      return "grey";
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
                    bgcolor: selectedColumns.has(index + 1)
                      ? "orange"
                      : "white",
                  }}
                >
                  <Box>
                    <Typography variant="body2">{header.codigo}</Typography>
                    <Typography variant="body2">
                      {header.descripcion}
                    </Typography>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowHeaders.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell id={`rowHeader-${rowIndex}`}>
                  <Box>
                    <Typography variant="body2">{row.codigo}</Typography>
                    <Typography variant="body2">{row.descripcion}</Typography>
                  </Box>
                </TableCell>
                {columnHeaders.map((_, colIndex) => {
                  const cellKey = `${rowIndex + 1}-${colIndex + 1}`;
                  const value = cellValues[cellKey] || "";
                  const backgroundColor = getCellBackgroundColor(
                    rowIndex,
                    colIndex
                  );
                  return (
                    <TableCell
                      key={colIndex}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      onDoubleClick={() =>
                        handleDoubleClick(rowIndex, colIndex)
                      }
                      sx={{
                        cursor: "pointer",
                        bgcolor: backgroundColor,
                      }}
                    >
                      {editingCell[cellKey] ? (
                        <TextField
                          value={value}
                          onChange={(e) =>
                            handleInputChange(e, rowIndex, colIndex)
                          }
                          onBlur={() =>
                            setEditingCell((prev) => ({
                              ...prev,
                              [cellKey]: false,
                            }))
                          }
                        />
                      ) : (
                        <Typography style={{ fontWeight: "700" }}>
                          {value}
                        </Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RelacionamientoDeMetas;
