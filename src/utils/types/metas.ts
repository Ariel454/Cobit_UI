export interface MetaEmpresarial {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface MetaAlineamiento {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface MetaEmpresarialAlineamiento {
  id: number;
  id_meta_empresarial: number;
  id_meta_alineamiento: number;
  nivel: string;
}

export interface MetaAlineamientoGobierno {
  id: number;
  id_meta_alineamiento: number;
  id_objetivo_gobierno: number;
  nivel: string;
}
