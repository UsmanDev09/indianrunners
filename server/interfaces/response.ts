import { Document } from 'mongoose'

export interface Response {
    success: boolean,
    data: Document, 
    message: string
}

export interface Responses {
    success: boolean,
    data: Document[], 
    message: string
}