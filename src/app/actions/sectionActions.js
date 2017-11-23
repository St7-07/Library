export function setSection(section,subcontent) {
    return {
        type: "SET_SECTION",
        payload: {section,subcontent}
    };
} 

export function setSubcontent(subcontent) {
    return {
        type: "SET_SUBCONTENT",
        payload: subcontent
    };
}
