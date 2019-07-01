export class CommonUtil {

    /**
     * API to verify if the String input provided is empty
     * 
     * @param value String input to be checked for empty
     */
    static isEmptyString(value) {
        return value == "" || value == null || value == undefined;
    }
}