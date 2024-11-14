export const selectStatus = (status: number) => {
  switch (status) {
    case 1:
      return "Vacancies";
    case 2:
      return "Adjustable";
    case 3:
      return "Consultation Required";
    case 4:
      return "No Vacancies";
  }
};
