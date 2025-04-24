export const handleError = (error: unknown) => {
  const msg = error instanceof Error ? error.message : "Um erro ocorreu";

  return { errorMessage: msg };
};
