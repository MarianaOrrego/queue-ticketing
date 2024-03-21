export const handleClearLocalStorage = () => {
  const confirmClear = window.confirm(
    "¿Estás seguro de que deseas reiniciar el sistema?",
  );

  if (confirmClear) {
    localStorage.clear();
    window.location.reload();
  }
};