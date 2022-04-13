const toggleValue = (bool) => {
    if (typeof bool === "boolean") {
        return !bool
    }
}

export default toggleValue