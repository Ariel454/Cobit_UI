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
const rowHeaders = [
  {
    id: 1,
    codigo: "EDM01",
    descripcion:
      "Asegurar el establecimiento y el mantenimiento del marco de gobierno",
  },
  {
    id: 2,
    codigo: "EDM02",
    descripcion: "Asegurar la obtención de beneficios",
  },
  {
    id: 3,
    codigo: "EDM03",
    descripcion: "Asegurar la optimización del riesgo",
  },
  {
    id: 4,
    codigo: "EDM04",
    descripcion: "Asegurar la optimización de los recursos",
  },
  {
    id: 5,
    codigo: "EDM05",
    descripcion: "Asegurar el compromiso de las partes interesadas",
  },
  {
    id: 6,
    codigo: "APO01",
    descripcion: "Gestionar el marco de gestión de I&T",
  },
  { id: 7, codigo: "APO02", descripcion: "Gestionar la estrategia" },
  {
    id: 8,
    codigo: "APO03",
    descripcion: "Gestionar la arquitectura empresarial",
  },
  { id: 9, codigo: "APO04", descripcion: "Gestionar la innovación" },
  { id: 10, codigo: "APO05", descripcion: "Gestionar el portafolio" },
  {
    id: 11,
    codigo: "APO06",
    descripcion: "Gestionar el presupuesto y los costes",
  },
  { id: 12, codigo: "APO07", descripcion: "Gestionar los recursos humanos" },
  { id: 13, codigo: "APO08", descripcion: "Gestionar las relaciones" },
  {
    id: 14,
    codigo: "APO09",
    descripcion: "Gestionar los acuerdos de servicio",
  },
  { id: 15, codigo: "APO10", descripcion: "Gestionar los proveedores" },
  { id: 16, codigo: "APO11", descripcion: "Gestionar la calidad" },
  { id: 17, codigo: "APO12", descripcion: "Gestionar el riesgo" },
  { id: 18, codigo: "APO13", descripcion: "Gestionar la seguridad" },
  { id: 19, codigo: "APO14", descripcion: "Gestionar los datos" },
  { id: 20, codigo: "BAI01", descripcion: "Gestionar los programas" },
  {
    id: 21,
    codigo: "BAI02",
    descripcion: "Gestionar la definición de requisitos",
  },
  {
    id: 22,
    codigo: "BAI03",
    descripcion: "Gestionar la identificación y construcción de soluciones",
  },
  {
    id: 23,
    codigo: "BAI04",
    descripcion: "Gestionar la disponibilidad y capacidad",
  },
  { id: 24, codigo: "BAI05", descripcion: "Gestionar el cambio organizativo" },
  { id: 25, codigo: "BAI06", descripcion: "Gestionar los cambios de TI" },
  {
    id: 26,
    codigo: "BAI07",
    descripcion: "Gestionar la aceptación y la transición de los cambios de TI",
  },
  { id: 27, codigo: "BAI08", descripcion: "Gestionar el conocimiento" },
  { id: 28, codigo: "BAI09", descripcion: "Gestionar los activos" },
  { id: 29, codigo: "BAI10", descripcion: "Gestionar la configuración" },
  { id: 30, codigo: "BAI11", descripcion: "Gestionar los proyectos" },
  { id: 31, codigo: "DSS01", descripcion: "Gestionar las operaciones" },
  {
    id: 32,
    codigo: "DSS02",
    descripcion: "Gestionar las peticiones y los incidentes de servicio",
  },
  { id: 33, codigo: "DSS03", descripcion: "Gestionar los problemas" },
  { id: 34, codigo: "DSS04", descripcion: "Gestionar la continuidad" },
  {
    id: 35,
    codigo: "DSS05",
    descripcion: "Gestionar los servicios de seguridad",
  },
  {
    id: 36,
    codigo: "DSS06",
    descripcion: "Gestionar los controles de procesos de negocio",
  },
  {
    id: 37,
    codigo: "MEA01",
    descripcion: "Gestionar la monitorización del desempeño y la conformidad",
  },
  {
    id: 38,
    codigo: "MEA02",
    descripcion: "Gestionar el sistema de control interno",
  },
  {
    id: 39,
    codigo: "MEA03",
    descripcion: "Gestionar el cumplimiento de los requisitos externos",
  },
  { id: 40, codigo: "MEA04", descripcion: "Gestionar el aseguramiento" },
];

// Ajustar los valores iniciales de las celdas para que comiencen en 1-1
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

const RelacionamientoDeObjetivos = () => {
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
        Relacionamiento de Objetivos de Gobierno y Gestión con Metas de
        Alineamiento
      </Typography>
      <TableContainer height={700} component={Box}>
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
