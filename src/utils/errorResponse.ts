const errorResponse = (error:string) => ({
    error
})

export const serverErrorResponse = Response.json({ error: 'Internal Server Error!' }, { status: 500 })

export default errorResponse