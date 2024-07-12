import { useEffect, useReducer } from "react";
import { MetaEmpresarial, MetaAlineamiento } from "./utils/types/metas";
import axios from "axios";

type GetMetasEmpresariales = {
  type: "get-metas-empresariales";
  payload: { metasEmpresariales: MetaEmpresarial[] };
};

type GetMetasAlineamiento = {
  type: "get-metas-alineamiento";
  payload: { metasAlineamiento: MetaAlineamiento[] };
};

type SetSelectedTicket = {
  type: "set-selected-ticket";
  payload: {
    selectedTicket: string | null;
  };
};

type ActionTypes =
  | GetMetasEmpresariales
  | SetSelectedTicket
  | GetMetasAlineamiento;

type State = {
  metasEmpresariales: MetaEmpresarial[] | null;
  metasAlineamiento: MetaAlineamiento[] | null;
  selectedTicket: string | null;
};

const initialState: State = {
  metasEmpresariales: [],
  metasAlineamiento: [],
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
  setSelectedTicket: (selectedTicket: string | null) => void;
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

  const setSelectedTicket = (selectedTicket: string | null) => {
    dispatch({
      type: "set-selected-ticket",
      payload: { selectedTicket },
    });
  };

  useEffect(() => {
    getMetasEmpresariales();
    getMetasAlineamiento();
  }, []);

  return {
    ...state,
    getMetasAlineamiento,
    getMetasEmpresariales,
    setSelectedTicket,
  };
};
