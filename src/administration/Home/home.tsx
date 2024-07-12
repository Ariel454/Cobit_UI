import React, { useState, useRef, useEffect, Reducer } from "react";
import axios from "axios";
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
import { MetaEmpresarial } from "../../utils/types/metas";
import { ReducerValue } from "../../reducer";

interface RelacionamientoDeMetasProps {
  cobitReducer: ReducerValue;
}

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

const RelacionamientoDeMetas: React.FC<RelacionamientoDeMetasProps> = ({
  cobitReducer,
}) => {
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

  const { metasEmpresariales, metasAlineamiento } = cobitReducer;

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
    const selectedRowHeader = metasAlineamiento?.find((row) => {
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
              {metasEmpresariales?.map((header, index) => (
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
            {metasAlineamiento?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell id={`rowHeader-${rowIndex}`}>
                  <Box>
                    <Typography variant="body2">{row.codigo}</Typography>
                    <Typography variant="body2">{row.descripcion}</Typography>
                  </Box>
                </TableCell>
                {metasEmpresariales?.map((_, colIndex) => {
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
