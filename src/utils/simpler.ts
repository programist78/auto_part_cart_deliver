const simpler = (obj:any) => {
    return JSON.parse(JSON.stringify(obj))
}

export default simpler