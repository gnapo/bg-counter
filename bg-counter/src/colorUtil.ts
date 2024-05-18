export function darkenColor(color: string, percent: number) {
    // strip the leading # if it's there
    color = color.replace(/^\s*#|\s*$/g, '')

    // convert 3 char codes -> 6, e.g. `E0F` -> `EE00FF`
    if(color.length == 3){
        color = color.replace(/(.)/g, '$1$1')
    }

    let r = parseInt(color.substr(0, 2), 16),
        g = parseInt(color.substr(2, 2), 16),
        b = parseInt(color.substr(4, 2), 16)

    // darken
    r = Math.floor(r * (100 - percent) / 100)
    g = Math.floor(g * (100 - percent) / 100)
    b = Math.floor(b * (100 - percent) / 100)

    r = r < 0 ? 0 : r
    g = g < 0 ? 0 : g
    b = b < 0 ? 0 : b

    // convert r, g, b to hex
    let rs = r.toString(16),
    gs = g.toString(16),
    bs = b.toString(16)

    // pad with 0s
    rs = (rs.length < 2) ? '0' + rs : rs
    gs = (gs.length < 2) ? '0' + gs : gs
    bs = (bs.length < 2) ? '0' + bs : bs

    return '#' + rs + gs + bs;
}
