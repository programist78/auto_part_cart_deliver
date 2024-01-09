const logger = (...string) => {
    if (process.env.NODE_ENV === 'development') console.log(...string)
}

export default logger