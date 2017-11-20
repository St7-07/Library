export function setSection(section) {
    return {
        type: "SET_SECTION",
        payload: section
    };
}

export function setSubcontent(subcontent) {
    return {
        type: "SET_SUBCONTENT",
        payload: subcontent
    };
}
