export default function convertToWon(val, n) {

    let flip = 0
    let temp = ""
    let result = ""

    try {

        if (n !== null) {
            let val1 = (val * n).toString()
            flip = val1.split("").reverse().join("")
        }
        if (n === null) flip = val.split("").reverse().join("")

        for (let i = 1; i <= flip.length; i++) {

            temp += flip.charAt(i - 1)
            if (i % 3 === 0 && i <= flip.length - 1) {
                temp += ","
            }
        }

        result = temp.split("").reverse().join("")
    } catch (e) {

    }
    return result;
}
