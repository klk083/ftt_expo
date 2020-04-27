const NUM_ORDERS = 3

// generate a random number between min and max
const rand = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min

// generate a distance
const generateKM = () => `${rand(50, 0)}.${rand(9, 0)}`

// create an order
const createOrder = () => ({distKm: generateKM()})

// compare two distances for distance
export const compareDistKm = (contact1, contact2) => Number(contact1.distKm) > Number(contact2.distKm)

// add keys to based on index
const addKeys = (val, key) => ({key, ...val})

// create an array of length NUM_ORDERS and add keys
export default Array.from({length: NUM_ORDERS}, createOrder).map(addKeys)
