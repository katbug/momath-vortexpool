const CHANGE_RATE = 10;

export function* getRainbow() {
    for (let h = 0; h < 360; h = h < 359 - CHANGE_RATE ? h + CHANGE_RATE : 0) {
        const color = [h, 50, 70];
        yield color;
    }
}
