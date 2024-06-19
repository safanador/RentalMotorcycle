
const formatPrice = (amount: number): string => {
    return Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0

    }).format(amount);
}

export default formatPrice;
