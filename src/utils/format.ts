/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

export const formatDate = (date: string) => {
  try {
    let d = new Date(date);

    const formatBr = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Formato 24h
    });

    return formatBr.format(d);
  } catch (error) {
    return "data inválida";
  }
};
