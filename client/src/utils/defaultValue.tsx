export default function defaultValue(type: string) {
    switch(type) {
        case "string": return "";
        case "number": return 1;
        case "boolean": return false;
        default: return undefined;
    }
}