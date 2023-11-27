

export class Clase {
  public nombre = '';
  public id = '';
  public seccion = '';
  public bloqueinicio = '';
  public bloquetermino = '';



  public getNombre(): string {
    if (this.nombre.trim() === '') {
      return 'No asignado';
    }
    return this.nombre.trim();
  }

  public getId(): string {
    if (this.id.trim() === '') {
      return 'No asignado';
    }
    return this.id.trim();
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

  public getSeccion(): string {
    if (this.seccion.trim() === '') {
      return 'No asignado';
    }
    return this.seccion.trim();

  }   
   public getBloqueInicio(): string {
    if (this.bloqueinicio.trim() === '') {
      return 'No asignado';
    }
    return this.bloqueinicio.trim();
  }

  public getBloqueTermino(): string {
    if (this.bloquetermino.trim() === '') {
      return 'No asignado';
    }
    return this.bloquetermino.trim();
  }
}