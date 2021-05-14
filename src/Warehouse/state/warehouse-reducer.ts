export type ItemType = {
    id: string
    batchPartNumber: string //pn
    category: string //rubr
    vendor: string //vend
    name: string
    balance: number //ost
    measureUnit: string //ediz
    priceIn: number //price_in
    pricePack: number //price_p
    pack: number
    compatibility: string //sov
    expenditure: number //rashod
    reserveR: number //rezerv_r
    reserveS: number //rezerv_s
}