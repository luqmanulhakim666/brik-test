export function usePipe() {
  // Shared method
  function decimal(val) {
    if (val) {
      return String(val)
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    return '0'
  }

  // Return values that you want to expose
  return {
    decimal
  }
}
