import mongoose from 'mongoose'

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/recipe')
        console.log('mongodb is connected successfully!')
    } catch (e) {
        console.error('Mongodb connection failed')
        process.exit(1)
    }
}

export default connectToDB