export const SuccessHandler = (res, message, status = 200, data = null) => {
    res.status(status).json({
        success: true,
        message: message,
        ...(data && { data })
    })
}