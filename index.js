import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import programRoutes from './routes/doctors.js'
import curriculumRoutes from './routes/wards.js'
import courseRoutes from './routes/patients.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

/* routes */
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/doctor', doctorRoutes)
app.use('/doctors/: doctorId/wards', wardRoutes)
app.use('/wards/:wardId/patients/', patientRoutes)

/* Connect to Database */
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    dbName: 'class_scheduling'
})
.then(() => app.listen(PORT, () => console.log(`Server listening on ${PORT}`)))
.catch((error) => console.log(`${error} did not connect`))
