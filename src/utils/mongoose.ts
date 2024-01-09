import mongoose from 'mongoose'
import logger from './logger'

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        logger('Mongoose Connected 💚')
    } catch {
        throw new Error('Connect to Mongoose failed ❌')
    }
}

export default connect