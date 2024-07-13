import React, { useState, useEffect } from "react";
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
import { ReducerValue } from "../../reducer";

interface RelacionamientoDeObjetivosProps {
  cobitReducer: ReducerValue;
}

const RelacionamientoDeObjetivos: React.FC<RelacionamientoDeObjetivosProps> = ({
  cobitReducer,
}) => {
  const {
    objetivosGobierno,
    metasAlineamiento,
    metasAlineamientoGobierno,
    setHighlightedMetas,
    highlightedMetas,
  } = cobitReducer;

  const initialCellValues: { [key: string]: string } = {};
  metasAlineamientoGobierno?.forEach((meta) => {
    const cellKey = `${meta.id_objetivo_gobierno}-${meta.id_meta_alineamiento}`;
    initialCellValues[cellKey] = meta.nivel;
  });

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
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const defaultSelectedColumns = new Set<number>();

    highlightedMetas?.forEach((highlightedMeta) => {
      metasAlineamiento?.forEach((meta, index) => {
        if (meta.id === highlightedMeta.id) {
          defaultSelectedColumns.add(index + 1);
        }
      });
    });

    setSelectedColumns(defaultSelectedColumns);
  }, [highlightedMetas, metasAlineamiento]);

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
    if (selectedColumns.has(colIndex + 1)) {
      return; // Do nothing if the column is already selected
    }
    setSelectedColumns((prev) => {
      const newSet = new Set(prev);
      newSet.add(colIndex + 1);
      return newSet;
    });
  };

  const handleRowHeaderClick = (rowIndex: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (prev.has(rowIndex + 1)) {
        newSet.delete(rowIndex + 1);
      } else {
        newSet.add(rowIndex + 1);
      }
      return newSet;
    });
  };

  const getCellBackgroundColor = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex + 1}-${colIndex + 1}`;
    if (selectedColumns.has(colIndex + 1)) {
      const value = cellValues[cellKey];
      if (value === "S") {
        return "lightblue";
      } else if (value === "P") {
        const rowHeaderCell = document.getElementById(`rowHeader-${rowIndex}`);
        if (rowHeaderCell) {
          rowHeaderCell.style.backgroundColor = "orange";
        }
        return "#6868f3";
      }
    }
    const clicks = cellClicks[cellKey] || 0;
    if (clicks >= 3) {
      return "#6868f3";
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
        Relacionamiento de Objetivos de Gobierno y Gestión con Metas de
        Alineamiento
      </Typography>
      <TableContainer height={700} component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {metasAlineamiento?.map((header, index) => (
                <TableCell
                  key={index}
                  onClick={() => handleColumnHeaderClick(index)}
                  sx={{
                    cursor: selectedColumns.has(index + 1)
                      ? "default"
                      : "pointer",
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
            {objetivosGobierno?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell
                  id={`rowHeader-${rowIndex}`}
                  onClick={() => handleRowHeaderClick(rowIndex)}
                  sx={{
                    cursor: "pointer",
                    bgcolor: selectedRows.has(rowIndex + 1) ? "green" : "white",
                  }}
                >
                  <Box>
                    <Typography variant="body2">{row.codigo}</Typography>
                    <Typography variant="body2">{row.descripcion}</Typography>
                  </Box>
                </TableCell>
                {metasAlineamiento?.map((_, colIndex) => {
                  const cellKey = `${row.id}-${colIndex + 1}`;
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
                        <Typography>{value}</Typography>
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

export default RelacionamientoDeObjetivos;
