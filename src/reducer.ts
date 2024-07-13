import { useEffect, useReducer } from "react";
import {
  MetaEmpresarial,
  MetaAlineamiento,
  MetaEmpresarialAlineamiento,
  MetaAlineamientoGobierno,
} from "./utils/types/metas";
import axios from "axios";
import { ObjetivoGobierno } from "./utils/types/objetivo";

type GetMetasEmpresariales = {
  type: "get-metas-empresariales";
  payload: { metasEmpresariales: MetaEmpresarial[] };
};

type GetMetasAlineamiento = {
  type: "get-metas-alineamiento";
  payload: { metasAlineamiento: MetaAlineamiento[] };
};

type GetObjetivosGobierno = {
  type: "get-objetivos-gobierno";
  payload: { objetivosGobierno: ObjetivoGobierno[] };
};

type GetMetasEmpresarialesAlineamiento = {
  type: "get-metas-empresariales-alineamiento";
  payload: {
    metasEmpresarialesAlineamiento: MetaEmpresarialAlineamiento[];
  };
};

type GetMetasAlineamientoGobierno = {
  type: "get-metas-alineamiento-gobierno";
  payload: {
    metasAlineamientoGobierno: MetaAlineamientoGobierno[];
  };
};

type SetSelectedTicket = {
  type: "set-selected-ticket";
  payload: {
    selectedTicket: string | null;
  };
};

type SetHighlightedMetas = {
  type: "set-highlighted-metas";
  payload: { highlightedMetas: MetaAlineamiento[] };
};

type SetHighlightedObjetivos = {
  type: "set-highlighted-objetivos";
  payload: { highlightedObjetivos: ObjetivoGobierno[] };
};

type ActionTypes =
  | GetMetasEmpresariales
  | SetSelectedTicket
  | GetMetasAlineamiento
  | GetMetasEmpresarialesAlineamiento
  | GetObjetivosGobierno
  | GetMetasAlineamientoGobierno
  | SetHighlightedObjetivos
  | SetHighlightedMetas;

type State = {
  metasEmpresariales: MetaEmpresarial[] | null;
  metasAlineamiento: MetaAlineamiento[] | null;
  objetivosGobierno: ObjetivoGobierno[] | null;
  metasAlineamientoGobierno: MetaAlineamientoGobierno[] | null;
  metasEmpresarialesAlineamiento: MetaEmpresarialAlineamiento[] | null;
  highlightedMetas: MetaAlineamiento[];
  highlightedObjetivos: ObjetivoGobierno[];
  selectedTicket: string | null;
};

const initialState: State = {
  metasEmpresariales: [],
  metasAlineamiento: [],
  objetivosGobierno: [],
  highlightedObjetivos: [],
  metasEmpresarialesAlineamiento: [],
  metasAlineamientoGobierno: [],
  highlightedMetas: [],
  selectedTicket: null,
};

const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "get-metas-empresariales": {
      const { metasEmpresariales } = action.payload;
      return {
        ...state,
        metasEmpresariales,
      };
    }
    case "get-metas-alineamiento": {
      const { metasAlineamiento } = action.payload;
      return {
        ...state,
        metasAlineamiento,
      };
    }
    case "get-metas-empresariales-alineamiento": {
      const { metasEmpresarialesAlineamiento } = action.payload;
      return {
        ...state,
        metasEmpresarialesAlineamiento,
      };
    }
    case "get-objetivos-gobierno": {
      const { objetivosGobierno } = action.payload;
      return {
        ...state,
        objetivosGobierno,
      };
    }
    case "get-metas-alineamiento-gobierno": {
      const { metasAlineamientoGobierno } = action.payload;
      return {
        ...state,
        metasAlineamientoGobierno,
      };
    }
    case "set-highlighted-metas": {
      const { highlightedMetas } = action.payload;
      return {
        ...state,
        highlightedMetas,
      };
    }
    case "set-selected-ticket": {
      const { selectedTicket } = action.payload;
      return {
        ...state,
        selectedTicket,
      };
    }
    default:
      return state;
  }
};

export interface ReducerValue extends State {
  getMetasEmpresariales: () => void;
  getMetasAlineamiento: () => void;
  getMetasEmpresarialesAlineamiento: () => void;
  getMetasAlineamientoGobierno: () => void;
  getObjetivosGobierno: () => void;
  setSelectedTicket: (selectedTicket: string | null) => void;
  setHighlightedMetas: (highlightedMetas: MetaAlineamiento[]) => void;
}

export const useCobitReducer = (): ReducerValue => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getMetasEmpresariales = async () => {
    try {
      const response = await axios.get<MetaEmpresarial[]>(
        "http://localhost:3001/api/metas_empresariales"
      );
      dispatch({
        type: "get-metas-empresariales",
        payload: {
          metasEmpresariales: response.data,
        },
      });
    } catch (error) {
      console.error("Error fetching column headers:", error);
    }
  };

  const getMetasAlineamiento = async () => {
    try {
      const response = await axios.get<MetaAlineamiento[]>(
        "http://localhost:3001/api/metas_alineamiento"
      );
      dispatch({
        type: "get-metas-alineamiento",
        payload: {
          metasAlineamiento: response.data,
        },
      });
    } catch (error) {
      console.error("Error fetching row headers:", error);
    }
  };

  const getObjetivosGobierno = async () => {
    try {
      const response = await axios.get<ObjetivoGobierno[]>(
        "http://localhost:3001/api/objetivos_gobierno"
      );
      dispatch({
        type: "get-objetivos-gobierno",
        payload: {
          objetivosGobierno: response.data,
        },
      });
    } catch (error) {
      console.error("Error fetching row headers:", error);
    }
  };

  const getMetasAlineamientoGobierno = async () => {
    try {
      const response = await axios.get<MetaAlineamientoGobierno[]>(
        "http://localhost:3001/api/metas_alineamiento_gobierno"
      );
      dispatch({
        type: "get-metas-alineamiento-gobierno",
        payload: {
          metasAlineamientoGobierno: response.data,
        },
      });
    } catch (error) {
      console.error("Error fetching cell values:", error);
    }
  };

  const getMetasEmpresarialesAlineamiento = async () => {
    try {
      const response = await axios.get<MetaEmpresarialAlineamiento[]>(
        "http://localhost:3001/api/metas_empresariales_alineamiento"
      );
      dispatch({
        type: "get-metas-empresariales-alineamiento",
        payload: {
          metasEmpresarialesAlineamiento: response.data,
        },
      });
    } catch (error) {
      console.error("Error fetching cell values:", error);
    }
  };

  const setSelectedTicket = (selectedTicket: string | null) => {
    dispatch({
      type: "set-selected-ticket",
      payload: { selectedTicket },
    });
  };

  const setHighlightedMetas = (highlightedMetas: MetaAlineamiento[]) => {
    // Añadido
    dispatch({
      type: "set-highlighted-metas",
      payload: { highlightedMetas },
    });
  };

  useEffect(() => {
    getMetasEmpresariales();
    getMetasAlineamiento();
    getMetasEmpresarialesAlineamiento();
    getMetasAlineamientoGobierno();
    getObjetivosGobierno();
  }, []);

  return {
    ...state,
    getMetasAlineamiento,
    getMetasEmpresariales,
    getMetasEmpresarialesAlineamiento,
    getMetasAlineamientoGobierno,
    setSelectedTicket,
    getObjetivosGobierno,
    setHighlightedMetas,
  };
};
