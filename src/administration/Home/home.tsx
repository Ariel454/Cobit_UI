import React, { useState, useEffect, Reducer } from "react";
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
import { MetaAlineamiento, MetaEmpresarial } from "../../utils/types/metas";
import { ReducerValue } from "../../reducer";

interface RelacionamientoDeMetasProps {
  cobitReducer: ReducerValue;
}

const RelacionamientoDeMetas: React.FC<RelacionamientoDeMetasProps> = ({
  cobitReducer,
}) => {
  const {
    metasEmpresariales,
    metasAlineamiento,
    metasEmpresarialesAlineamiento,
    setHighlightedMetas,
    highlightedMetas,
  } = cobitReducer;

  const [cellValues, setCellValues] = useState<{ [key: string]: string }>({});
  const [editingCell, setEditingCell] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [cellClicks, setCellClicks] = useState<{ [key: string]: number }>({});
  const [selectedColumns, setSelectedColumns] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const initialValues: { [key: string]: string } = {};
    metasEmpresarialesAlineamiento?.forEach((meta) => {
      const cellKey = `${meta.id_meta_alineamiento}-${meta.id_meta_empresarial}`;
      initialValues[cellKey] = meta.nivel;
    });
    setCellValues(initialValues);
  }, [metasEmpresarialesAlineamiento]);

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
    const newHighlightedMetas =
      metasAlineamiento?.filter((row) => {
        const cellKey = `${row.id}-${colIndex + 1}`;
        return cellValues[cellKey] === "P";
      }) || [];

    setHighlightedMetas([...highlightedMetas, ...newHighlightedMetas]);

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
      <Box mt={2}>
        <Typography variant="h6">Metas de Alineamiento Pintadas:</Typography>
        <ul>
          {highlightedMetas?.map((meta, index) => (
            <li key={index}>
              {meta.codigo}: {meta.descripcion}
            </li>
          ))}
        </ul>
      </Box>
    </Container>
  );
};

export default RelacionamientoDeMetas;
