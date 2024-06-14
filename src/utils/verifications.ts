export const renderStatus = (status: string) => {
  const statusList = {
    VALIDATED: 'VALIDADO',
    IN_REVIEW: 'AUDITORIA',
    REJECTED: 'REJEITADO',
  } as any;

  return statusList[status || 'IN_REVIEW'];
};

export const renderColors = (status: string) => {
  const colors = {
    VALIDATED: '#14dd46',
    IN_REVIEW: '#008cff',
    REJECTED: '#ff0000',
  } as any;

  return colors[status || 'IN_REVIEW'];
};

export const renderSituationColors = (status: string) => {
  const colors = {
    NORMAL: '#14dd46',
    AUSENTE: '#FF9100',
    VAGO: '#008cff',
  } as any;

  return colors[status || 'NORMAL'];
};

export const onValidateStatus = (value: string) => {
  switch (value) {
    case 'FORNECIMENTO_PDE':
      return {
        pde: true,
        fornecimento: true,
      };
    case 'WITH_HIDRO':
      return {
        hydro: true,
      };
    case 'WITH_PDE':
      return {
        pde: true,
      };
    case 'WITH_FORNECIMENTO':
      return {
        fornecimento: true,
      };
    default:
      return null;
  }
};
