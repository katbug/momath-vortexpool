export function* getRainbow() {
    for (let h = 0; h < 360; h = h < 359 ? h + 1 : 0) {
        const color = [h, 50, 70];
        yield color;
    }
}
