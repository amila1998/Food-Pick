export default function getCurrency(locale: string, currencyCode: string): string {
    try {
        const currency = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode })
            .resolvedOptions()
            .currency;
        return currency ?? 'USD';
    } catch (e) {
        return 'USD';
    }
}