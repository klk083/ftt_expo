const NUM_ORDERS = 3
let num = 0

// generate a random number between min and max
const rand = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min

// generate a distance
const generateKM = () => `${rand(50, 0)}.${rand(9, 0)}`

// generate phone number
const generatePhoneNum = () => `+47
${rand(9, 0)}${rand(9, 0)}${rand(9, 0)}
${rand(9, 0)}${rand(9, 0)}
${rand(9, 0)}${rand(9, 0)}${rand(9, 0)}`

// generate new key value
const updateKey = () => {
    num = num + 1
    return num
}

// create an order
const createOrder = () => ({key: updateKey(), distKm: generateKM(), phoneNumber: generatePhoneNum()})

// compare two distances for distance
export const compareDistKm = (order1, order2) => Number(order1.distKm) > Number(order2.distKm)

// add keys to based on index
const addKeys = (val, key) => ({key, ...val})

// create an array of length NUM_ORDERS and add keys
export default Array.from({length: NUM_ORDERS}, createOrder).map(addKeys)
